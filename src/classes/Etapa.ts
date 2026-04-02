import { StatusEtapa } from "../enums/StatusEtapa.js"
import Funcionario from "./Funcionario.js"

export default class Etapa {
    nome : string
    prazo : string
    status  : StatusEtapa
    funcionarios : Funcionario[]

    constructor(nome : string, prazo : string){
        this.nome = nome
        this.prazo = prazo
        this.status = StatusEtapa.PENDENTE
        this.funcionarios = []
    }

    iniciar(){
        if (this.status == StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO
        }else{
            console.log('Etapa deve estar com status PENDENTE para ser iniciada')
        }
    }

    finalizar(){
        if (this.status == StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA
        }else {
            console.log('Etapa deve estar com status ANDAMENTO para ser iniciada')
        }
    }

    associarFuncionario(novoFuncionario : Funcionario) : void{
       const funcionarioCadastrado = this.funcionarios.some(funcionario => funcionario.id === novoFuncionario.id)

       if (funcionarioCadastrado){
            console.log('Funcionario já está na Etapa !')
            return
       }
       
       this.funcionarios.push(novoFuncionario)
       console.log('Funcionario Cadastrado com Sucesso !')
    }

    listarFuncionariosEmEtapa() : Array <Funcionario>{

        if (this.funcionarios.length === 0){
            console.log('Não Existe Nenhum Funcionario Cadastrado !')
            return this.funcionarios
        }

        this.funcionarios.forEach(funcionario => {
            console.log(`ID: ${funcionario.id} | Nome: ${funcionario.nome} | Cargo : ${funcionario.nivelPermissao}`)
        })

        return this.funcionarios
    }
}