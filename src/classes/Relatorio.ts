import { ResultadoTeste } from "../enums/ResultadoTeste.js"
import { StatusEtapa } from "../enums/StatusEtapa.js"
import { StatusPeca } from "../enums/StatusPeca.js"
import { TipoAeronave } from "../enums/TipoAeronave.js"
import { TipoPeca } from "../enums/TipoPeca.js"
import { TipoTeste } from "../enums/TipoTeste.js"
import Etapa from "./Etapa.js"
import Peca from "./Peca.js"
import Teste from "./Teste.js"
import Aeronave from "./Aeronave.js"

class Relatorio {

    gerarRelatorio(aeronave : Aeronave) : void {
        console.log(`\n----- AERONAVE ${aeronave.codigo} -----`)
        console.log(`Código: ${aeronave.codigo}`)
        console.log(`Modelo: ${aeronave.modelo}`)
        console.log(`Tipo: ${TipoAeronave[aeronave.tipo]}`)
        console.log(`Capacidade: ${aeronave.capacidade}`)
        console.log(`Alcance: ${aeronave.alcance}`)
        console.log(`------------------------------`)  

        console.log(`\n----- PEÇAS -----`)

        if(aeronave.pecas.length === 0){
            console.log('Nenhuma Peça Cadastrada')
            console.log(`------------------------------`)   
        } else {
            aeronave.pecas.forEach((peca) => {
                console.log(`Nome: ${peca.nome}`)
                console.log(`Fornecedor: ${peca.fornecedor}`)
                console.log(`Tipo: ${TipoPeca[peca.tipo]}`)
                console.log(`Status: ${StatusPeca[peca.status]}`)
                console.log(`------------------------------`)
            })
        }

        console.log(`\n----- ETAPAS -----`)

        if (aeronave.etapas.length === 0) {
            console.log('Nenhuma Etapa Cadastrada')
            console.log(`------------------------------`)   
        } else {
            aeronave.etapas.forEach((etapa) => {
                console.log(`Nome: ${etapa.nome}`)
                console.log(`Prazo: ${etapa.prazo}`)
                console.log(`Status: ${StatusEtapa[etapa.status]}`)
                console.log(`------------------------------`)    
            })
        }

        console.log(`\n----- TESTES -----`)

        if (aeronave.testes.length === 0) {
            console.log('Nenhum Teste Cadastrado')
            console.log(`------------------------------`)   
        } else {
            aeronave.testes.forEach((teste) => {
                console.log(`Tipo: ${TipoTeste[teste.tipo]}`)
                console.log(`Resultado: ${ResultadoTeste[teste.resultado]}`)
                console.log(`------------------------------`)  
            })
        }
    }

    salvarEmArquivo() : void {
        return
    }
}