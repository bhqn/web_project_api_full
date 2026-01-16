# 🚀 Projeto Full Stack — Integração Frontend & Backend  
### TripleTen — Sprint 18
Link do projeto: https://web-project-frontend-eight.vercel.app/login

Este projeto foi desenvolvido como parte da **Sprint 18 da TripleTen**, com o objetivo de **integrar completamente o frontend e o backend** de uma aplicação web moderna, incluindo autenticação, manipulação de dados, persistência em banco de dados e deploy em ambientes de produção.

---

## 🧩 Descrição do Projeto

A aplicação é um sistema full stack que permite aos usuários:

- Criar conta e realizar login
- Autenticar-se via **JWT**
- Visualizar e gerenciar cards (criar, curtir, descurtir e remover)
- Atualizar informações do perfil e avatar
- Manter sessões seguras entre recarregamentos de página
- Trabalhar com dados persistidos em banco NoSQL

Todo o fluxo do frontend está **diretamente integrado** ao backend por meio de uma **API REST**, sem uso de dados mockados.

---

## 🎯 Objetivo da Sprint

- Integrar frontend e backend em um único projeto funcional
- Implementar autenticação segura
- Trabalhar com banco de dados em nuvem
- Realizar deploy real da aplicação
- Garantir persistência e consistência de dados entre usuários

---

## 🛠️ Tecnologias Utilizadas

### 🔹 Frontend
- **React**
- **React Router DOM**
- **Context API**
- JavaScript (ES6+)
- CSS

**Principais responsabilidades do frontend:**
- Gerenciamento de estado do usuário autenticado
- Controle de rotas protegidas
- Comunicação com a API via `fetch`
- Atualização dinâmica da interface sem recarregar a página

**Deploy do Frontend:**  
- **Vercel**

---

### 🔹 Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- Middlewares de autenticação e autorização

**Principais responsabilidades do backend:**
- Criação e validação de usuários
- Emissão e verificação de tokens JWT
- Controle de permissões (ex: dono do card)
- Manipulação de likes e dislikes
- Comunicação segura com o banco de dados

**Deploy do Backend:**  
- **Render**

---

### 🔹 Banco de Dados
- **MongoDB Atlas**

**Coleções principais:**
- `users`
- `cards`

---

## 🏗️ Arquitetura da Aplicação

```txt
Frontend (React - Vercel)
        |
        |  Requisições HTTP (JWT no header Authorization)
        ↓
Backend (Node.js + Express - Render)
        |
        ↓
Banco de Dados (MongoDB Atlas)

