<div align='center'>
  <img width="180px" alt="mysql logo" src="https://cdn-icons-png.flaticon.com/512/273/273177.png" />
  <h1>Store Manager</h1>
  <p>
    Uma API RESTful para um sistema de gerenciamento de vendas onde é possível criar, visualizar, deletar e atualizar produtos e vendas, usando banco de dados MySQL e arquitetura MSC (model-service-controller).
  </p>
</div>

<br /><hr /><br />

## 🖥️ Tecnologias
Este projeto foi desenvolvido usando as seguintes tecnologias:

-  **MySQL e MySQL Workbench**, para gerencialmente do banco de dados;
-  **Express** para criação de rotas e requisições;
-  **Mocha, Chai e Sinon** para testes, usando TDD (Test Driven Development);
-  **Docker** para conteinerização de toda a aplicação;
-  **ESLint** para padronização de código;
-  **Git** para versionamento de código;
-  **Visual Studio Code** para edição de código.

## ℹ️ Como usar
Para testar este projeto, precisará das seguintes ferramentas instaladas:

- Git
- Docker
- Docker Compose

<br/>

```bash
# Clone o repositório
git clone https://github.com/vinibortoletto/store-manager.git

# Inicie o Docker Compose
docker-compose up -d

# Entre no container
docker exec -it store-manager bash

# Instale as dependências
npm install

# Inicie o servidor Node
npm run debug

```

<br /><hr /><br />

<p align="center">
  Criado e desenvolvido por <b>Vinicius Bortoletto</b>
  <br/><br/>
  
  <a href="https://vinibortoletto.vercel.app/">
    <img alt="portfolio" height="30px" src="https://i.imgur.com/7lbNPnj.png" />
  </a>
  &nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/vinicius-bortoletto/">
    <img alt="linkedIn" height="30px" src="https://i.imgur.com/TQRXxhT.png" />
  </a>
  &nbsp;&nbsp;
</p>
