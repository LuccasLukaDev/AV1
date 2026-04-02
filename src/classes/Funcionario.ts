import { NivelPermissao } from "../enums/NivelPermissao.js"
import fs from "fs"

export default class Funcionario {
    id : string
    nome : string
    telefone : string
    endereco : string
    usuario : string
    senha : string
    nivelPermissao : NivelPermissao

    constructor(id : string, nome : string, telefone : string, endereco : string, usuario : string, senha : string, nivelPermissao : NivelPermissao){
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }

    auth(usuarioDigitado : string, senhaDigitada : string) : boolean {
        return usuarioDigitado === this.usuario && senhaDigitada === this.senha
    }

    salvar() : void {
        console.clear()
        const caminho = `./JSON_Funcionarios/funcionario_${this.id}.json`

        fs.writeFileSync(caminho, JSON.stringify(this, null, 2))

        console.log('\nFuncionario Salvo com Sucesso !')
        console.log(`------------------------------`)
    }

    carregar() : void {
        console.clear()
        const caminho = `./JSON_Funcionarios/funcionario_${this.id}.json`

        if(!fs.existsSync(caminho)) {
            console.clear()
            console.log('\nArquivo não Encontrado ! Funcionario não existe !')
            console.log(`------------------------------`)  
            return
        }

        const data = fs.readFileSync(caminho, "utf-8")
        const obj = JSON.parse(data)

        this.id = obj.id
        this.nome = obj.nome
        this.usuario = obj.usuario
        this.senha = obj.senha
        this.endereco = obj.endereco
        this.nivelPermissao = obj.nivelPermissao as NivelPermissao
        this.telefone = obj.telefone
        console.log('\nFuncionario Carregado com Sucesso !')
        console.log(`------------------------------`)  
    }
}