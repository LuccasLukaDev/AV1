import { ResultadoTeste } from "../enums/ResultadoTeste.js";
import { TipoTeste } from "../enums/TipoTeste.js";

export default class Teste {
    tipo : TipoTeste
    resultado : ResultadoTeste
    data : string

    constructor(tipo : TipoTeste, resultado : ResultadoTeste, data : string) {
        this.tipo = tipo
        this.resultado = resultado
        this.data = data
    }

    salvar() : void {
        console.log("Salvando...")
    }

    carregar() : void{
        console.log("Carregando...")
    }
}
