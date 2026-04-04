import { ResultadoTeste } from "../enums/ResultadoTeste.js";
import { TipoTeste } from "../enums/TipoTeste.js";
import fs from "fs"

export default class Teste {
    tipo : TipoTeste
    resultado : ResultadoTeste
    idTeste : string

    constructor(tipo : TipoTeste, resultado : ResultadoTeste, idTeste : string) {
        this.tipo = tipo
        this.resultado = resultado
        this.idTeste = idTeste
    }

    salvar(): void {

        const caminho = `./JSON_Testes/teste_${this.idTeste}.json`

        const dados = JSON.stringify(this, null, 2)

        fs.writeFileSync(caminho, dados)

        console.log('\nTeste salvo com sucesso!')
        console.log(`------------------------------`)
    }

    carregar() : void{

        const caminho = `./JSON_Testes/teste_${this.idTeste}.json`

        if (!fs.existsSync(caminho)) {
            console.log('\nTeste não encontrado!')
            console.log(`------------------------------`)
            return
        }

        const data = fs.readFileSync(caminho, "utf-8")
        const obj = JSON.parse(data)

        this.tipo = obj.tipo as TipoTeste
        this.resultado = obj.resultado as ResultadoTeste
        this.idTeste = obj.idTeste

        console.log('\nTeste carregado com sucesso!')
        console.log(`----------------------------------`)
    }
}
