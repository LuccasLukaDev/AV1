import { StatusPeca } from "../enums/StatusPeca.js";
import { TipoPeca } from "../enums/TipoPeca.js";
import fs from "fs";

export default class Peca {
    public nome : string
    public fornecedor : string
    public tipo : TipoPeca
    public status : StatusPeca

    constructor(nome : string, fornecedor : string, tipo  : TipoPeca, status : StatusPeca) {
        this.nome = nome
        this.fornecedor = fornecedor
        this.tipo = tipo
        this.status = status
    }

    atualizarStatus(novoStatus : StatusPeca) : void {
        this.status = novoStatus
    }

    salvar() : void {
        console.clear()
        const caminho = `./JSON_Pecas/peca_${this.nome}.json`

        fs.writeFileSync(caminho, JSON.stringify(this, null, 2))

        console.log('\nPeça Salva com Sucesso !')
        console.log(`------------------------------`)
    }

    carregar() : void {
        console.clear()
        const caminho = `./JSON_Pecas/peca_${this.nome}.json`

        if(!fs.existsSync(caminho)) {
            console.clear()
            console.log('\nArquivo não Encontrado ! Peça não existe !')
            console.log(`------------------------------`)  
            return
        }

        const data = fs.readFileSync(caminho, "utf-8")
        const obj = JSON.parse(data)

        this.nome = obj.nome
        this.fornecedor = obj.fornecedor
        this.status = obj.status as StatusPeca
        this.tipo = obj.tipo as TipoPeca

        console.log('\nPeça Carregada com Sucesso !')
        console.log(`------------------------------`)
    }
}