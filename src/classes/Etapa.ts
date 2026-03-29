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

    iniciarEtapa(){
        this.status = StatusEtapa.ANDAMENTO
    }

    encerrarEtapa(){
        this.status = StatusEtapa.CONCLUIDA
    }

    adicionarFuncionario(novoFuncionario : Funcionario){
       const funcionarioCadastrado = this.funcionarios.some(funcionario => funcionario.id === novoFuncionario.id)

       if (funcionarioCadastrado){
            console.log('Funcionario já Cadastrado !')
            return
       }
       
       this.funcionarios.push(novoFuncionario)
       console.log('Funcionario Cadastrado com Sucesso !')
    }

    listarFuncionariosEmEtapa() {

        if (this.funcionarios.length === 0){
            console.log('Não Existe Nenhum Funcionario Cadastrado !')
            return
        }

        this.funcionarios.forEach(funcionario => {
            console.log(`ID: ${funcionario.id} | Nome: ${funcionario.nome} | Cargo : ${funcionario.nivelPermissao}`)
        })
    }
}