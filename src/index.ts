import Aeronave from "./classes/Aeronave.js";
import Etapa from "./classes/Etapa.js";
import Funcionario from "./classes/Funcionario.js";
import Peca from "./classes/Peca.js";
import Teste from "./classes/Teste.js";
import readline from 'readline'
import fs from "fs"

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

//console.log('Digite seu Usuario: ')
//console.log('Digite a sua Senha: ')

async function menu() {
    let opcao = -1
    let aeronaveAtual : Aeronave | null = null

    while (opcao != 0){
        console.log('\n---------- MENU ----------')
        console.log('1 - Cadastrar Aeronave')
        console.log('2 - Carregar Aeronave')
        console.log('3 - Detalhar Aeronave')
        console.log('0 - Sair\n')

        opcao = Number(await perguntar('Escolha uma opção: '))

        switch (opcao) {

            case 1:
                const codigo = await perguntar('Digite o Código da Aeronave: ')
                const caminho = `./JSON_Aeronaves/aeronave_${codigo}.json`

                if (fs.existsSync(caminho)){
                    console.clear()
                    console.log('\nJá existe uma Aeronave com este código !')
                    console.log(`------------------------------\n`)  
                    break
                }
                
                const modelo = await perguntar("Modelo: ")
                const tipo = await perguntarNumero('Tipo (1-Comercial 2-Militar): ', [1, 2])
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
                    console.log(`------------------------------\n`)  
                    break
                }
                
                aeronaveAtual = new Aeronave(codigoLoad, '', 0, 0, 0)
                aeronaveAtual.carregar()
                break
            
            case 3:
                if (!aeronaveAtual) {
                    console.log('Nenhuma Aeronave Carregada !')
                } else {
                    aeronaveAtual.detalhes()
                }
                break
            
            case 0:
                console.log('Saindo...')
                rl.close()
                process.exit(0)
        }
    }

}

menu()

