# 🚀 Projeto CRUD com Express, Mongoose e EJS

Este projeto foi desenvolvido para estudar e praticar o fluxo completo
de desenvolvimento de uma API utilizando **Node.js**, **Express**,
**Mongoose** (MongoDB) e **EJS** para renderização de páginas dinâmicas
no lado do servidor.

------------------------------------------------------------------------

## 📚 Tecnologias Utilizadas

-   **Node.js** -- Ambiente de execução para JavaScript no backend\
-   **Express** -- Framework minimalista para criação de servidores\
-   **Mongoose** -- ODM para interação com MongoDB\
-   **EJS** -- Template engine para renderização de páginas HTML\
-   **Nodemon** -- Ferramenta para reiniciar o servidor automaticamente

------------------------------------------------------------------------

## ⚙️ Passo a Passo do Projeto

### 1️⃣ Inicialização do Projeto

``` bash
npm init -y
npm install express mongoose ejs
npm install --save-dev nodemon
```

Configurar o `package.json` para rodar com nodemon:

``` jsonc
"scripts": {
  "dev": "nodemon src/index.js"
}
```

------------------------------------------------------------------------

### 2️⃣ Conexão com o Banco de Dados (Mongoose)

Criação do arquivo `database.js`:

``` js
const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/nome_do_banco');
    console.log("Conectado ao MongoDB!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
  }
}

module.exports = connect;
```

------------------------------------------------------------------------

### 3️⃣ Definição do Modelo (Mongoose Schema)

Criação da pasta `models` e do arquivo `user.model.js`:

``` js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
```

------------------------------------------------------------------------

### 4️⃣ Criação do Servidor Express + Rotas CRUD

Arquivo `src/index.js`:

``` js
const express = require("express");
const UserModel = require("./models/user.model");
const connect = require("./database");

const app = express();
connect();

app.use(express.json());

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", "src/views");

// Middleware de log
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);
  next();
});

// Rota para renderizar usuários na página
app.get('/views/users', async (req, res) => {
  const users = await UserModel.find({});
  res.render('index', { users });
});

// Rotas REST
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 8080;
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
```

------------------------------------------------------------------------

### 5️⃣ Criando a View com EJS

Arquivo `src/views/index.ejs`:

``` ejs
<!DOCTYPE html>
<html lang="pt-br">
  <%- include('./partials/head.ejs') %>
<body>
  <%- include('./partials/navbar.ejs') %>
  
  <header>
    <h2>Usuários</h2>
  </header>

  <div class="content">
    <% if (users.length > 0) { %>
      <% users.forEach(user => { %>
        <h3 class="title"><%= user.firstName %> <%= user.lastName %></h3>
        <p><%= user.email %></p>
      <% }) %>
    <% } else { %>
      <p>Não há usuários para exibir...</p>
    <% } %>
  </div>
</body>
</html>
```

------------------------------------------------------------------------

### 6️⃣ Testando no Postman

-   **POST /users** → Criar novo usuário enviando JSON no corpo da
    requisição.
-   **GET /users** → Listar usuários no formato JSON.
-   **GET /views/users** → Listar usuários renderizados no navegador com
    HTML dinâmico.

------------------------------------------------------------------------

## 📌 Resumo do Aprendizado

-   ✅ **Node.js + Express** para criar servidor HTTP.\
-   ✅ **Mongoose** para modelar e manipular documentos no MongoDB.\
-   ✅ **Middleware** para log e controle de fluxo da aplicação.\
-   ✅ **Rotas RESTful** para criar uma API organizada.\
-   ✅ **EJS** para renderizar dados dinâmicos no HTML.\
-   ✅ **Postman** para testar endpoints e garantir que tudo está
    funcionando.

------------------------------------------------------------------------

## 🎯 Próximos Passos

-   Criar **validações personalizadas** com Mongoose.\
-   Adicionar **tratamento de erros** global com middleware.\
-   Implementar **autenticação** (JWT) para proteger rotas.\
-   Estilizar a interface para exibir os dados de forma mais amigável.
