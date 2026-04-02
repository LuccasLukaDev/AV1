import { ResultadoTeste } from "../enums/ResultadoTeste.js"
import { StatusEtapa } from "../enums/StatusEtapa.js"
import { StatusPeca } from "../enums/StatusPeca.js"
import { TipoAeronave } from "../enums/TipoAeronave.js"
import { TipoPeca } from "../enums/TipoPeca.js"
import { TipoTeste } from "../enums/TipoTeste.js"
import Etapa from "./Etapa.js"
import Peca from "./Peca.js"
import Teste from "./Teste.js"
import fs from "fs"


export default class Aeronave {
    codigo : string
    modelo : string
    tipo : TipoAeronave
    capacidade : number
    alcance : number
    pecas : Peca[]
    etapas : Etapa[]
    testes : Teste[]

    constructor(codigo : string, modelo : string, tipo : TipoAeronave, capacidade : number, alcance : number) {
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capacidade = capacidade
        this.alcance = alcance
        this.pecas = []
        this.etapas = []
        this.testes = []
    }

    detalhes() : void {
        console.log(`\n----- AERONAVE ${this.codigo} -----`)
        console.log(`Código: ${this.codigo}`)
        console.log(`Modelo: ${this.modelo}`)
        console.log(`Tipo: ${TipoAeronave[this.tipo]}`)
        console.log(`Capacidade: ${this.capacidade}`)
        console.log(`Alcance: ${this.alcance}`)
        console.log(`------------------------------`)  

        console.log(`\n----- PEÇAS -----`)

        if(this.pecas.length === 0){
            console.log('Nenhuma Peça Cadastrada')
            console.log(`------------------------------\n`)   
        } else {
            this.pecas.forEach((peca) => {
                console.log(`Nome: ${peca.nome}`)
                console.log(`Fornecedor: ${peca.fornecedor}`)
                console.log(`Tipo: ${TipoPeca[peca.tipo]}`)
                console.log(`Status: ${StatusPeca[peca.status]}`)
                console.log(`------------------------------\n`)
            })
        }

        console.log(`----- ETAPAS -----`)

        if (this.etapas.length === 0) {
            console.log('Nenhuma Etapa Cadastrada')
            console.log(`------------------------------\n`)   
        } else {
            this.etapas.forEach((etapa) => {
                console.log(`Nome: ${etapa.nome}\n`)
                console.log(`Nome: ${etapa.prazo}\n`)
                console.log(`Nome: ${StatusEtapa[etapa.status]}\n`)
                console.log(`------------------------------\n`)    
            })
        }

        console.log(`----- TESTES -----`)

        if (this.testes.length === 0) {
            console.log('Nenhum Teste Cadastrado')
            console.log(`------------------------------`)   
        } else {
            this.testes.forEach((teste) => {
                console.log(`Tipo: ${TipoTeste[teste.tipo]}\n`)
                console.log(`Resultado: ${ResultadoTeste[teste.resultado]}\n`)
                console.log(`------------------------------\n`)  
            })
        }
    }

    salvar() : void {
        console.clear()
        const caminho = `./JSON_Aeronaves/aeronave_${this.codigo}.json`

        fs.writeFileSync(caminho, JSON.stringify(this, null, 2))

        console.clear()
        console.log('\nAeronave Salva com Sucesso !')
        console.log(`------------------------------`)
    }

    carregar() : void {
        console.clear()
        const caminho = `./JSON_Aeronaves/aeronave_${this.codigo}.json`

        if(!fs.existsSync(caminho)) {
            console.clear()
            console.log('\nArquivo não Encontrado ! Aeronave não Existe !')
            console.log(`------------------------------`)  
            return
        }

        const data = fs.readFileSync(caminho, "utf-8")
        const obj = JSON.parse(data)

        this.modelo = obj.modelo
        this.tipo = obj.tipo as TipoAeronave
        this.capacidade = obj.capacidade
        this.alcance = obj.alcance
        this.pecas = obj.pecas
        this.etapas = obj.etapas
        this.testes = obj.testes
        console.clear()
        console.log('\nAeronave Carregada com Sucesso !')
        console.log(`------------------------------`)  
    }

    adicionarEtapa(novaEtapa : Etapa) {
        const etapaExiste = this.etapas.some(etapa => etapa.nome === novaEtapa.nome)

        if (etapaExiste) {
            console.log('Etapa já Cadastrada')
            return
        }

        this.etapas.push(novaEtapa)
        console.log('A Etapa foi Cadastrada com Sucesso !')
    }

    adicionarPeca(novaPeca : Peca) {
        const pecaExiste = this.pecas.some(peca => peca.nome === novaPeca.nome)

        if (pecaExiste) {
            console.log('Peça já Cadastrada !')
            return
        }

        this.pecas.push(novaPeca)
        console.log('A Peça foi Cadastrada com Sucesso !')
    }

    adicionarTeste(novoTeste : Teste) {
        const testeExiste = this.testes.some(teste => teste.data === novoTeste.data)

        if (testeExiste) {
            console.log('Teste já Cadastrado')
            return
        }

        this.testes.push(novoTeste)
        console.log('O Teste foi Cadastrada com Sucesso !')
    }
}

