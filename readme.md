# ✈️ Sistema de Gerenciamento de Aeronaves

Sistema desenvolvido em **Node.js + TypeScript** para gerenciamento completo de aeronaves, incluindo peças, etapas de produção, funcionários, testes e geração de relatórios.

---

## 📌 Funcionalidades

### 🛩️ Aeronave

* Cadastrar aeronave
* Carregar aeronave
* Visualizar detalhes completos

### 👷 Funcionários

* Cadastro de funcionários
* Login com autenticação
* Controle de permissões:

  * Administrador
  * Engenharia
  * Operador

### 🔩 Peças

* Cadastro de peças
* Atualização de status:

  * Em produção
  * Em transporte
  * Pronta
* Associação com aeronave

### 📋 Etapas

* Criação de etapas
* Controle de fluxo:

  * Não permite múltiplas etapas em andamento
  * Ordem obrigatória (não pode pular etapa)
* Iniciar e finalizar etapas
* Associar funcionários às etapas
* Listar funcionários por etapa

### 🧪 Testes

* Cadastro de testes
* Tipos:

  * Elétrico
  * Hidráulico
  * Aerodinâmico
* Resultado:

  * Aprovado
  * Reprovado
* Associação com aeronave

### 📄 Relatórios

* Geração de relatório completo da aeronave
* Exportação para arquivo `.txt`
* Arquivos salvos em:

```
/relatorios_txt/
```

---

## 🔐 Controle de Permissões

| Função      | Administrador | Engenharia | Operador |
| ----------- | ------------- | ---------- | -------- |
| Aeronave    | ✅             | ❌          | ❌        |
| Funcionário | ✅             | ❌          | ❌        |
| Peças       | ✅             | ✅          | ❌        |
| Etapas      | ✅             | ✅          | ❌        |
| Testes      | ✅             | ✅          | ❌        |
| Relatórios  | ✅             | ❌          | ❌        |

---

## 💾 Persistência de Dados

Os dados são armazenados em arquivos JSON organizados em pastas:

```
/JSON_Aeronaves
/JSON_Funcionarios
/JSON_Pecas
/JSON_Testes
```

---

## ⚙️ Tecnologias Utilizadas

* Node.js
* TypeScript
* File System (fs)
* readline (CLI interativo)

---

## 🚀 Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Compilar o projeto

```bash
npm run buikd
```

### 3. Executar

```bash
npm start
```

---

## 🧠 Regras de Negócio Implementadas

* ❌ Não permite criar nova etapa se existir uma não finalizada
* ❌ Não permite iniciar etapa fora de ordem
* ❌ Não permite mais de uma etapa em andamento
* ❌ Não permite adicionar funcionário em etapa concluída
* ❌ Não permite duplicidade de:

  * Aeronaves
  * Peças
  * Testes
  * Funcionários em etapas

---

## 📁 Estrutura do Projeto

```
src/
 ├── classes/
 │   ├── Aeronave.ts
 │   ├── Etapa.ts
 │   ├── Funcionario.ts
 │   ├── Peca.ts
 │   ├── Teste.ts
 │   └── Relatorio.ts
 │
 ├── enums/
 │   ├── NivelPermissao.ts
 │   ├── StatusEtapa.ts
 │   ├── StatusPeca.ts
 │   ├── TipoAeronave.ts
 │   ├── TipoPeca.ts
 │   └── TipoTeste.ts
 │
 └── index.ts
```

---

## 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos e prática de **Programação Orientada a Objetos (POO)** com persistência em arquivos.

---

## ✅ Status do Projeto

✔ Sistema completo
✔ Todas funcionalidades implementadas
✔ Persistência em JSON
✔ Relatórios funcionando

---

## 🔥 Possíveis Melhorias Futuras

* Exportar relatório em PDF
* Interface gráfica (GUI)
* Banco de dados (MongoDB / PostgreSQL)
* API REST

---
