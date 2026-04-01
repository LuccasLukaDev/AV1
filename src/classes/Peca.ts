import { StatusPeca } from "../enums/StatusPeca.js";
import { TipoPeca } from "../enums/TipoPeca.js";

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
        console.log("Salvando...")
    }

    carregar() : void {
        console.log("Carregando...")
    }
}