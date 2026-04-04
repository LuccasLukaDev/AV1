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
import fs from "fs"

export default class Relatorio {

    gerarRelatorio(aeronave : Aeronave) : string {

        let relatorio = ''

        relatorio += `\n----- AERONAVE ${aeronave.codigo} -----\n`
        relatorio += `Código: ${aeronave.codigo}\n`
        relatorio += `Modelo: ${aeronave.modelo}\n`
        relatorio += `Tipo: ${TipoAeronave[aeronave.tipo]}\n`
        relatorio += `Capacidade: ${aeronave.capacidade}\n`
        relatorio += `Alcance: ${aeronave.alcance}\n`
        relatorio += `------------------------------\n`

        relatorio += `\n----- PEÇAS -----\n`

        if(aeronave.pecas.length === 0){
            relatorio += 'Nenhuma Peça Cadastrada\n'
        } else {
            aeronave.pecas.forEach((peca) => {
                relatorio += `Nome: ${peca.nome}\n`
                relatorio += `Fornecedor: ${peca.fornecedor}\n`
                relatorio += `Tipo: ${TipoPeca[peca.tipo]}\n`
                relatorio += `Status: ${StatusPeca[peca.status]}\n`
                relatorio += `------------------------------\n`
            })
        }

        relatorio += `\n----- ETAPAS -----\n`

        if (aeronave.etapas.length === 0) {
            relatorio += 'Nenhuma Etapa Cadastrada\n'
        } else {
            aeronave.etapas.forEach((etapa) => {
                relatorio += `Nome: ${etapa.nome}\n`
                relatorio += `Prazo: ${etapa.prazo}\n`
                relatorio += `Status: ${StatusEtapa[etapa.status]}\n`
                relatorio += `------------------------------\n`
            })
        }

        relatorio += `\n----- TESTES -----\n`

        if (aeronave.testes.length === 0) {
            relatorio += 'Nenhum Teste Cadastrado\n'
        } else {
            aeronave.testes.forEach((teste) => {
                relatorio += `Tipo: ${TipoTeste[teste.tipo]}\n`
                relatorio += `Resultado: ${ResultadoTeste[teste.resultado]}\n`
                relatorio += `------------------------------\n`
            })
        }

        return relatorio
    }

    salvarEmArquivo(aeronave: Aeronave) : void {

        const pasta = './relatorios_txt/'

        if (!fs.existsSync(pasta)) {
            fs.mkdirSync(pasta)
        }

        const conteudo = this.gerarRelatorio(aeronave)

        const caminho = `${pasta}relatorio_${aeronave.codigo}.txt`

        fs.writeFileSync(caminho, conteudo)

        console.log('\nRelatório salvo com sucesso!')
        console.log('------------------------------')
    }

}
