import Aeronave from "./classes/Aeronave.js";
import Etapa from "./classes/Etapa.js";
import Funcionario from "./classes/Funcionario.js";
import Peca from "./classes/Peca.js";
import Teste from "./classes/Teste.js";
import readline from 'readline'
import fs, { readdir } from "fs"
import { NivelPermissao } from "./enums/NivelPermissao.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

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

        if (obj.usuario === usuarioDigitado && obj.senha === senhaDigitada) {
            return new Funcionario(
                obj.id,
                obj.nome,
                obj.telefone,
                obj.endereco,
                obj.usuario,
                obj.senha,
                obj.nivelPermissao
            )
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

    while (!funcionarioAtual){
        funcionarioAtual = await login()
    }

    console.log(`\nSeja Bem-Vindo ${funcionarioAtual.usuario} !`)
    console.log(`---------------------------------`)

    while (opcao != 0){
        console.log('\n---------- MENU ----------')
        console.log('1 - Cadastrar Aeronave')
        console.log('2 - Carregar Aeronave')
        console.log('3 - Detalhar Aeronave')
        console.log('4 - Cadastrar Funcionario')
        console.log('5 - Carregar Funcionario')
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
                if (funcionarioAtual.nivelPermissao !== NivelPermissao.ADMINISTRADOR){
                    console.clear()
                    console.log('\nVocê não tem permissão para acessar está funcionalidade !')
                    console.log(`---------------------------------------------------------`)
                    break
                }

                const codigoLoad = await perguntar('Digite o Código da Aeronave: ')

                if (aeronaveAtual && aeronaveAtual.codigo === codigoLoad) {
                    console.clear()
                    console.log('\nAeronave já está Carregada !')
                    console.log(`------------------------------\n`)  
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
                    console.log('\nJá existe funcionario já existe !')
                    console.log(`------------------------------\n`)
                    break
                }

                const nome = await perguntar('Nome: ')
                const usuario = await perguntar('Nome de Usuario: ')
                const senha = await perguntar('Senha: ')
                const telefone = await perguntar('Telefone: ')
                const endereco = await perguntar('Endereco: ')
                const nivelPermissao = await perguntarNumero('Nivel de Permissao (0-Administrador 1-Engenharia 2-Operador): ', [0, 1, 2])

                funcionarioAtual = new Funcionario(
                    id,
                    nome,
                    telefone,
                    endereco,
                    usuario,
                    senha,
                    nivelPermissao
                )

                funcionarioAtual.salvar()
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

            case 0:
                console.log('Saindo...')
                rl.close()
                process.exit(0)
            
            default:
                console.clear()
                console.log('\nOpção Invalida ! Escolha um dos números das opções do menu !')
                console.log(`-----------------------------------------------------------------`) 
                
        }
    }

}

menu()

