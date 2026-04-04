import { ResultadoTeste } from "../enums/ResultadoTeste.js"
import { StatusEtapa } from "../enums/StatusEtapa.js"
import { StatusPeca } from "../enums/StatusPeca.js"
import { TipoAeronave } from "../enums/TipoAeronave.js"
import { TipoPeca } from "../enums/TipoPeca.js"
import { TipoTeste } from "../enums/TipoTeste.js"
import Etapa from "./Etapa.js"
import Funcionario from "./Funcionario.js"
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
        console.clear()
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
            console.log(`------------------------------`)   
        } else {
            this.pecas.forEach((peca) => {
                console.log(`Nome: ${peca.nome}`)
                console.log(`Fornecedor: ${peca.fornecedor}`)
                console.log(`Tipo: ${TipoPeca[peca.tipo]}`)
                console.log(`Status: ${StatusPeca[peca.status]}`)
                console.log(`------------------------------`)
            })
        }

        console.log(`\n----- ETAPAS -----`)

        if (this.etapas.length === 0) {
            console.log('Nenhuma Etapa Cadastrada')
            console.log(`------------------------------`)   
        } else {
            this.etapas.forEach((etapa) => {
                console.log(`Nome: ${etapa.nome}`)
                console.log(`Prazo: ${etapa.prazo}`)
                console.log(`Status: ${StatusEtapa[etapa.status]}`)
                console.log(`------------------------------`)    
            })
        }

        console.log(`\n----- TESTES -----`)

        if (this.testes.length === 0) {
            console.log('Nenhum Teste Cadastrado')
            console.log(`------------------------------`)   
        } else {
            this.testes.forEach((teste) => {
                console.log(`Tipo: ${TipoTeste[teste.tipo]}`)
                console.log(`Resultado: ${ResultadoTeste[teste.resultado]}`)
                console.log(`------------------------------`)  
            })
        }
    }

    salvar() : void {
        console.clear()
        const caminho = `./JSON_Aeronaves/aeronave_${this.codigo}.json`

        fs.writeFileSync(caminho, JSON.stringify(this, null, 2))

        console.clear()
        console.log('\nSalvo com Sucesso !')
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
        this.pecas = obj.pecas.map((peca : any) => { return new Peca(peca.nome, peca.fornecedor, peca.tipo, peca.status) })
        this.etapas = obj.etapas.map( (etapa : any) => { 
            
            const novaEtapa = new Etapa(etapa.nome, etapa.prazo)

            novaEtapa.funcionarios = (etapa.funcionarios || []).map((funcionario : any) => {
                return new Funcionario(
                    funcionario.id,
                    funcionario.nome,
                    funcionario.telefone,
                    funcionario.endereco,
                    funcionario.usuario,
                    funcionario.senha,
                    funcionario.nivelPermissao
                )
            })
            return novaEtapa
        })
        this.testes = obj.testes.map((teste : any) => { return new Teste(teste.tipo, teste.resultado, teste.idTeste) })
        console.clear()
        console.log('\nAeronave Carregada com Sucesso !')
        console.log(`------------------------------`)  
    }
}

