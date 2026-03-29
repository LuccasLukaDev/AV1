import { ResultadoTeste } from "../enums/ResultadoTeste.js";
import { TipoTeste } from "../enums/TipoTeste.js";
import Funcionario from "./Funcionario.js";

export default class Teste {
    tipo : TipoTeste
    resultado? : ResultadoTeste
    data : string
    responsavel : Funcionario

    constructor(tipo : TipoTeste, data : string, responsavel : Funcionario) {
        this.tipo = tipo
        this.data = data
        this.responsavel = responsavel
    }

    registrarResultado(resultadoRegistrado : ResultadoTeste) {
        this.resultado = resultadoRegistrado
    }
}
