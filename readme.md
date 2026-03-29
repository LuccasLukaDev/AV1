# ✈️ Sistema de Gerenciamento de Aeronaves

## 📌 Descrição

Este projeto consiste em um sistema desenvolvido em **TypeScript** para gerenciar o processo de construção e testes de aeronaves.

O sistema permite controlar:

* Aeronaves
* Peças
* Etapas de produção
* Testes realizados
* Funcionários envolvidos

---

## 🚀 Funcionalidades

### ✈️ Aeronave

* Cadastro de aeronaves
* Associação de peças, etapas e testes
* Controle de duplicidade

### 🔧 Peças

* Cadastro de peças
* Controle de status (produção, transporte, pronta)

### 📋 Etapas

* Criação de etapas de produção
* Controle de status:

  * Pendente
  * Em andamento
  * Concluída
* Associação de funcionários
* Listagem de funcionários por etapa

### 🧪 Testes

* Registro de testes realizados
* Definição de tipo de teste
* Registro de resultado (aprovado/reprovado)
* Associação com responsável

### 👨‍🔧 Funcionários

* Cadastro de funcionários
* Controle de nível de permissão:

  * Administrador
  * Engenheiro
  * Operador
* Sistema de autenticação

---

## 🛠️ Tecnologias utilizadas

* TypeScript
* Node.js

---

## 📁 Estrutura do Projeto

```
src/
│
├── enums/
│   ├── TipoAeronave.ts
│   ├── TipoPeca.ts
│   ├── TipoTeste.ts
│   ├── StatusPeca.ts
│   ├── StatusEtapa.ts
│   ├── ResultadoTeste.ts
│   └── NivelPermissao.ts
│
├── models/
│   ├── Aeronave.ts
│   ├── Peca.ts
│   ├── Etapa.ts
│   ├── Teste.ts
│   └── Funcionario.ts
│
└── index.ts (em desenvolvimento)
```

---

## 📌 Status do Projeto

🚧 Em desenvolvimento

✔️ Modelagem completa das entidades
✔️ Estrutura modular implementada
🔄 Implementação do CLI (menu interativo) em andamento

---

## 💡 Objetivo

Aplicar conceitos de:

* Programação Orientada a Objetos (POO)
* TypeScript
* Organização modular de código
* Boas práticas de desenvolvimento

---

## ▶️ Como executar o projeto

### 📌 Pré-requisitos

Antes de começar, você precisa ter instalado:

* Node.js (versão 18+ recomendada)
* npm

---

### 📥 Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

---

### 📦 Instalar dependências

```bash
npm install
```

---

## 🚀 Executando o projeto

### 🔹 Modo desenvolvimento (recomendado)

```bash
npm run dev
```

👉 Executa diretamente com `ts-node` usando o arquivo:

```
src/index.ts
```

---

### 🔹 Compilar o projeto

```bash
npm run build
```

👉 Os arquivos compilados serão gerados em:

```
dist/
```

---

### 🔹 Executar versão compilada

```bash
npm start
```

👉 Executa o arquivo:

```
dist/index.js
```

---

## ⚙️ Configurações do Projeto

* O projeto utiliza **ES Modules** (`"type": "module"`)
* Compilação com `module: NodeNext`
* Código fonte em `src/`
* Código compilado em `dist/`

---

## 📌 Observação

O arquivo `index.ts` (menu CLI) ainda está em desenvolvimento.
Atualmente, o sistema já possui toda a modelagem completa das entidades.

---

## 👨‍💻 Autor

Desenvolvido por **Lucas da Silva Alves**
