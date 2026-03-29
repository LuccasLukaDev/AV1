import { TipoAeronave } from "../enums/TipoAeronave.js"
import Etapa from "./Etapa.js"
import Peca from "./Peca.js"
import Teste from "./Teste.js"

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

