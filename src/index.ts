import Aeronave from "./classes/Aeronave.js";
import Etapa from "./classes/Etapa.js";
import Funcionario from "./classes/Funcionario.js";
import Peca from "./classes/Peca.js";
import Teste from "./classes/Teste.js";
import Relatorio from "./classes/Relatorio.js"; 
import readline from 'readline'
import fs from "fs"
import path from "path"
import { NivelPermissao } from "./enums/NivelPermissao.js";
import { StatusEtapa } from "./enums/StatusEtapa.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function perguntar(pergunta : string) : Promise<string> {
    return new Promise (resolve => {
        rl.question(pergunta, resposta => resolve(resposta) )
    })
}

async function perguntarNumero(msg : string, validos? : number[]) : Promise<number> {
    while(true) {

        const valor = Number(await perguntar(msg))

        if (isNaN(valor)) {
            console.log('Digite um numero válido !')
            continue
        }

        if (validos && !validos.includes(valor)) {
            console.log(`Digite Apenas ${validos.join(' ou ')}`)
            continue
        }

        return valor
    }

}

async function login() : Promise<Funcionario | null> {
    const usuarioDigitado = await perguntar('Digite seu Usuario: ')
    const senhaDigitada = await perguntar('Digite sua Senha: ')

    const pasta = './JSON_Funcionarios/'
    const arquivos = fs.readdirSync(pasta)

    for (const arquivo of arquivos) {
        const data = fs.readFileSync(pasta + arquivo, "utf-8")
        const obj = JSON.parse(data)

        const funcionario = new Funcionario(
                obj.id,
                obj.nome,
                obj.telefone,
                obj.endereco,
                obj.usuario,
                obj.senha,
                obj.nivelPermissao
        )

        const autenticado = funcionario.auth(usuarioDigitado, senhaDigitada)

        if (autenticado) {
            return funcionario
        }
    }

    console.log('\nUsuario ou Senha Invalidos !!')
    console.log(`------------------------------`)
    return null
}

async function menu() {
    let opcao = -1
    let aeronaveAtual : Aeronave | null = null
    let funcionarioAtual : Funcionario | null = null
    let pecaAtual : Peca | null = null
    let testeAtual : Teste | null = null

    while (!funcionarioAtual){
        funcionarioAtual = await login()
    }

    console.clear()
    console.log(`\nSeja Bem-Vindo ${funcionarioAtual.usuario} !`)
    console.log(`---------------------------------`)

    while (opcao != 0){
        console.log('\nCarregando...')
        await delay(3000)
        console.clear()
        console.log('\n---------- MENU ----------')

        console.log('\n----- AERONAVE -----')
        console.log('1 - Cadastrar Aeronave')
        console.log('2 - Carregar Aeronave')
        console.log('3 - Detalhar Aeronave')
        console.log('----------------------')

        console.log('\n----- FUNCIONARIO -----')
        console.log('4 - Cadastrar Funcionario')
        console.log('5 - Carregar Funcionario')
        console.log('----------------------')

        console.log('\n----- PEÇA -----')
        console.log('6 - Cadastrar Peça')
        console.log('7 - Carregar Peça')
        console.log('8 - Adicionar Peça a Aeronave')
        console.log('9 - Atualizar Status da Peça')
        console.log('-----------------')

        console.log('\n----- ETAPA -----')
        console.log('10 - Criar e Adicionar Etapa a Aeronave')
        console.log('11 - Iniciar Etapa')
        console.log('12 - Finalizar Etapa')
        console.log('13 - Associar Funcionário à Etapa')
        console.log('14 - Listar Funcionarios em Etapa')
        console.log('-----------------')

        console.log('\n----- TESTE -----')
        console.log('15 - Cadastrar Teste')
        console.log('16 - Carregar Teste')
        console.log('17 - Adicionar Teste a Aeronave')
        console.log('-----------------')

        console.log('\n----- RELATORIO -----')
        console.log('18 - Gerar Relatorio')
        console.log('19 - Salvar Relatorio em Arquivo .txt')
        console.log('-----------------------')

        console.log('\n--------------------------')
        console.log('0 - Sair\n')

        opcao = Number(await perguntar('Escolha uma opção: '))

        switch (opcao) {

            case 1:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR){
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const codigo = await perguntar('Digite o Código da Aeronave: ')
                const caminho = `./JSON_Aeronaves/aeronave_${codigo}.json`

                if (fs.existsSync(caminho)){
                    console.clear()
                    console.log('\nJá existe uma Aeronave com este código !')
                    console.log(`------------------------------\n`)
                    break
                }
                
                const modelo = await perguntar("Modelo: ")
                const tipo = await perguntarNumero('Tipo (0-Comercial 1-Militar): ', [0, 1])
                const capacidade = await perguntarNumero('Capacidade: ')
                const alcance = await perguntarNumero('Alcance: ')

                aeronaveAtual = new Aeronave(
                    codigo,
                    modelo,
                    tipo,
                    capacidade,
                    alcance
                )

                aeronaveAtual.salvar()
                break

            case 2:
                const codigoLoad = await perguntar('Digite o Código da Aeronave: ')

                if (aeronaveAtual && aeronaveAtual.codigo === codigoLoad) {
                    console.clear()
                    console.log('\nAeronave já está Carregada !')
                    console.log(`------------------------------`)  
                    break
                }
                
                aeronaveAtual = new Aeronave(codigoLoad, '', 0, 0, 0)
                aeronaveAtual.carregar()
                break
            
            case 3:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR){
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.log('\nNenhuma Aeronave Carregada !')
                } else {
                    aeronaveAtual.detalhes()
                }
                break

            case 4:

                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR){
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }
                
                const id = await perguntar('Digite o ID do Funcionario: ')
                const caminhoFun = `./JSON_Funcionarios/funcionario_${id}.json`

                if (fs.existsSync(caminhoFun)) {
                    console.clear()
                    console.log('\nFuncionario já existe !')
                    console.log(`------------------------------\n`)
                    break
                }

                const nome = await perguntar('Nome: ')
                const usuario = await perguntar('Nome de Usuario: ')
                
                const senha = await perguntar('Senha: ')
                const telefone = await perguntar('Telefone: ')
                const endereco = await perguntar('Endereco: ')
                const nivelPermissao = await perguntarNumero('Nivel de Permissao (0-Administrador 1-Engenharia 2-Operador): ', [0, 1, 2])

                const novoFuncionario = new Funcionario(
                    id,
                    nome,
                    telefone,
                    endereco,
                    usuario,
                    senha,
                    nivelPermissao
                )

                const dir = './JSON_Funcionarios'
                const files = fs.readdirSync(dir)

                let usuarioExiste = false

                for (const file of files) {
                    const caminho = path.join(dir, file)
                    const dados = JSON.parse(fs.readFileSync(caminho, 'utf-8'))

                    if (dados.usuario === usuario) {
                        usuarioExiste = true
                        break
                    }
                }

                if (usuarioExiste) {
                    console.clear()
                    console.log('\nNome de usuário já existe!')
                    console.log('------------------------------\n')
                    break
                }

                novoFuncionario.salvar()
                break
            
            case 5:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR){
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const idLoad = await perguntar('Digite o ID do Funcionario: ')
                
                if (funcionarioAtual && funcionarioAtual.id === idLoad) {
                    console.clear()
                    console.log('\n Funcionario já Carregado !')
                    console.log(`------------------------------`)
                    break
                }
                
                funcionarioAtual = new Funcionario(idLoad, '', '', '', '', '', 0)
                funcionarioAtual.carregar()
                break

            case 6:
                if (!aeronaveAtual){
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const nomePeca = await perguntar('Nome: ')
                const caminhoPec = `./JSON_Pecas/peca_${nomePeca}.json`

                if (fs.existsSync(caminhoPec)){
                    console.clear()
                    console.log('\nPeça ja Existe !')
                    console.log(`------------------------------`)
                    break
                }

                const fornecedor = await perguntar('Fornecedor: ')
                const tipoPeca = await perguntarNumero('Tipo (0-Nacional 1-Importada): ', [0, 1])
                const statusPeca = await perguntarNumero('Status (0-Em Produção 1-Em Transporte 2-Pronta): ', [0, 1, 2])

                pecaAtual = new Peca (
                    nomePeca,
                    fornecedor,
                    tipoPeca,
                    statusPeca
                )

                pecaAtual.salvar()
                break
            
            case 7:
                const nomePec = await perguntar('Digite o Nome da Peça: ')

                if (pecaAtual && pecaAtual.nome === nomePec) {
                    console.clear()
                    console.log('\nPeça já está Carregada !')
                    console.log(`------------------------------`)  
                    break
                }
                
                pecaAtual = new Peca(nomePec, '', 0, 0)
                pecaAtual.carregar()
                break

            case 8:
                if (!aeronaveAtual){
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!pecaAtual){
                    console.clear()
                    console.log('\nPeça não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                aeronaveAtual.pecas.push(pecaAtual)
                aeronaveAtual.salvar()
                console.log(`Peça: '${pecaAtual.nome}' foi Adicionada com sucesso a Aeronave: '${aeronaveAtual.codigo}' !`)
                break
            
            case 9: 
                if (!pecaAtual){
                    console.clear()
                    console.log('\nPeça não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const pecaRef = pecaAtual

                const novoStatus = await perguntarNumero('\nNovo Status (0-Em Produção 1-Em Transporte 2-Pronta): ', [0, 1, 2])
                pecaAtual.status = novoStatus
                pecaAtual.salvar()

                const peca = aeronaveAtual?.pecas.find(peca => peca.nome === pecaRef.nome)
                if (peca) peca.status = novoStatus
                aeronaveAtual?.salvar()
                break

            case 10:
                
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR && 
                    funcionarioAtual.nivelPermissao !== NivelPermissao.ENGENHEIRO) {
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const existeEtapaNaoFinalizada = aeronaveAtual.etapas.some(etapa => etapa.status === 1)

                if (existeEtapaNaoFinalizada) {
                    console.clear()
                    console.log('\nExiste uma Etapa não Finalizada ! Finalize-a para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const nomeEtapa = await perguntar('Nome da Etapa: ')
                const prazo = await perguntar('Prazo da Etapa: ')

                const novaEtapa = new Etapa(nomeEtapa, prazo)
                aeronaveAtual.etapas.push(novaEtapa)
                aeronaveAtual.salvar()

                console.log(`\nEtapa: '${novaEtapa.nome}' criada e adicionada à Aeronave: ${aeronaveAtual.codigo} com sucesso!`)
                break

            case 11:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR && 
                    funcionarioAtual.nivelPermissao !== NivelPermissao.ENGENHEIRO) {
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const nomeEtap = await perguntar('Nome da Etapa: ')

                const etapa = aeronaveAtual.etapas.find(etapa => etapa.nome === nomeEtap)


                if (!etapa) {
                    console.clear()
                    console.log('\nEtapa não encontrada !')
                    console.log('------------------------------')
                    break
                }

                const indice = aeronaveAtual.etapas.indexOf(etapa)

                if (indice > 0) {
                    const etapaAnterior = aeronaveAtual.etapas[indice - 1]

                    if (etapaAnterior.status !== StatusEtapa.CONCLUIDA) {
                        console.clear()
                        console.log('\nFinalize a etapa anterior antes de iniciar esta!')
                        console.log('-----------------------------------')
                        break
                    }
                }

                if (etapa.status === StatusEtapa.ANDAMENTO) {
                    console.clear()
                    console.log('\nEtapa já em Andamento !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (etapa.status === StatusEtapa.CONCLUIDA) {
                    console.clear()
                    console.log('\nEsta Etapa já foi Finalizada !')
                    console.log(`-----------------------------------`)
                    break
                }
                

                const existeEtapaEmAndamento = aeronaveAtual.etapas.some(etapa => etapa.status === StatusEtapa.ANDAMENTO)

                if (existeEtapaEmAndamento) {
                    console.clear()
                    console.log('\nJá existe uma Etapa em ANDAMENTO!')
                    console.log('-----------------------------------')
                    break
                }

                etapa.iniciar()
                aeronaveAtual.salvar()

                console.log('\nEtapa Iniciada com Sucesso !')
                console.log(`---------------------------------`)
                break

            case 12:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR && 
                    funcionarioAtual.nivelPermissao !== NivelPermissao.ENGENHEIRO) {
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const nomeEta = await perguntar('Nome da Etapa: ')

                const etapaF = aeronaveAtual.etapas.find(etapa => etapa.nome === nomeEta)

                if (!etapaF) {
                    console.clear()
                    console.log('\nEtapa não encontrada !')
                    console.log('------------------------------')
                    break
                }

                if (etapaF.status === 2) {
                    console.clear()
                    console.log('\nEsta Etapa já foi Finalizada !')
                    console.log(`-----------------------------------`)
                    break
                }

                if (etapaF.status !== 1) {
                    console.clear()
                    console.log('\nA Etapa precisa estar em ANDAMENTO para ser Finalizada !')
                    console.log(`-----------------------------------`)
                    break
                }
            
                etapaF.finalizar()
                aeronaveAtual.salvar()

                console.log('\nEtapa Finalizada com Sucesso !')
                console.log(`---------------------------------`)
                break

            case 13:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR && 
                    funcionarioAtual.nivelPermissao !== NivelPermissao.ENGENHEIRO) {
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const nomeEt = await perguntar('Nome da Etapa: ')
                const nomeFuncionario = await perguntar('Nome do Funcionário: ')

                const etap = aeronaveAtual.etapas.find(etapa => etapa.nome === nomeEt)

                if (!etap) {
                    console.clear()
                    console.log('\nEtapa não encontrada !')
                    console.log('------------------------------')
                    break
                }

                if (etap.status === StatusEtapa.CONCLUIDA) {
                    console.clear()
                    console.log('\nNão é possível adicionar funcionários em uma etapa CONCLUÍDA!')
                    console.log('-----------------------------------')
                    break
                }

                const pasta = './JSON_Funcionarios/'
                const arquivos = fs.readdirSync(pasta)

                let funcionarioEncontrado: Funcionario | null = null

                for (const arquivo of arquivos) {
                    const data = fs.readFileSync(pasta + arquivo, "utf-8")
                    const obj = JSON.parse(data)

                    if (obj.nome === nomeFuncionario) {
                        funcionarioEncontrado = new Funcionario(
                            obj.id,
                            obj.nome,
                            obj.telefone,
                            obj.endereco,
                            obj.usuario,
                            obj.senha,
                            obj.nivelPermissao
                        )
                        break
                    }
                }

                if (!funcionarioEncontrado) {
                    console.clear()
                    console.log('\nFuncionário não encontrado !')
                    console.log('------------------------------')
                    break
                }

                const jaExiste = etap.funcionarios.some(func => func.nome === funcionarioEncontrado!.nome)

                if (jaExiste) {
                    console.clear()
                    console.log('\nFuncionário já está nesta Etapa!')
                    console.log('-----------------------------------')
                    break
                }

                etap.funcionarios.push(funcionarioEncontrado)
                aeronaveAtual.salvar()

                console.log('\nFuncionário adicionado à Etapa com sucesso!')
                console.log('-----------------------------------')
                break
            
            case 14:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR && 
                    funcionarioAtual.nivelPermissao !== NivelPermissao.ENGENHEIRO) {
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const nomeEtapaBusca = await perguntar('Nome da Etapa: ')

                const etapaBusca = aeronaveAtual.etapas.find(etapa => etapa.nome === nomeEtapaBusca)

                if (!etapaBusca) {
                    console.clear()
                    console.log('\nEtapa não encontrada !')
                    console.log('------------------------------')
                    break
                }

                console.clear()
                console.log(`\n----- FUNCIONÁRIOS DA ETAPA: ${etapaBusca.nome} -----`)

                etapaBusca.listarFuncionariosEmEtapa()

                break
            
            case 15:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR && 
                    funcionarioAtual.nivelPermissao !== NivelPermissao.ENGENHEIRO) {
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const idTeste = await perguntar('Identificador do Teste: ')
                const caminhoTeste = `./JSON_Testes/teste_${idTeste}.json`

                if (fs.existsSync(caminhoTeste)){
                    console.clear()
                    console.log('\nJá existe um Teste com este ID !')
                    console.log(`------------------------------\n`)
                    break
                }
                
                const tipoTeste = await perguntarNumero('Resultado (0-Elétrico 1-Hídraulico 2-Aerodinamico): ', [0, 1, 2])
                const resultadoTeste = await perguntarNumero('Resultado (0-Reprovado 1-Aprovado): ', [0, 1])

                testeAtual = new Teste(
                    tipoTeste,
                    resultadoTeste,
                    idTeste
                )

                testeAtual.salvar()
                break

            case 16:
                const testeId = await perguntar('Digite o Identificador do Teste: ')

                if (testeAtual && testeAtual.idTeste === testeId) {
                    console.clear()
                    console.log('\nTeste já está Carregado !')
                    console.log(`------------------------------`)  
                    break
                }
                
                testeAtual = new Teste(0, 0, testeId)
                testeAtual.carregar()
                break

            case 17:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR && 
                    funcionarioAtual.nivelPermissao !== NivelPermissao.ENGENHEIRO) {
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!testeAtual){
                    console.clear()
                    console.log('\nTeste não identificado ! Cadastre ou Carregue um para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                aeronaveAtual.testes.push(testeAtual)
                aeronaveAtual.salvar()
                console.log(`Teste: '${testeAtual.idTeste}' foi Adicionada com sucesso a Aeronave: '${aeronaveAtual.codigo}' !`)
                break

            case 18:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR) {
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const relatorio = new Relatorio()

                console.clear()
                console.log(relatorio.gerarRelatorio(aeronaveAtual))

                break

            case 19:
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR) {
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                if (!aeronaveAtual) {
                    console.clear()
                    console.log('\nAeronave não identificada ! Cadastre ou Carregue uma para Continuar !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const relatorioSalvar = new Relatorio()

                relatorioSalvar.salvarEmArquivo(aeronaveAtual)

                break

            case 0:
                console.log('Saindo...')
                rl.close()
                process.exit(0)
            
            default:
                console.clear()
                console.log('\nOpção Invalida ! Escolha um dos números das opções do menu !')
                console.log(`-----------------------------------------------------------------`) // Invencible
                
        }
    }

}

menu()

