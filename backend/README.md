# Tripleten web_project_around_express
author: Bernardo Quintanilha

## Descrição
Projeto simples em Node.js + Express que demonstra roteamento (routes) e uso de middlewares para tratamento de erros e respostas 404.

## Tecnologias
- Node.js
- Express

## Estrutura importante
- routes/users.js — rotas relacionadas a usuários (GET /users, GET /users/:id)
- routes/cards.js — rotas relacionadas a cartões (GET /cards)
- data/users.json — dados de exemplo dos usuários
- data/cards.json — dados de exemplo dos cards
- app.js — configuração do servidor, registro de rotas e middlewares (404 e tratamento de erros)

## Funcionalidades
- Rotas REST básicas para leitura de recursos
- Middleware para retornar 404 quando a rota não for encontrada
- Middleware global de tratamento de erros que retorna status apropriado e mensagem

## Endpoints principais
- GET / -> Mensagem de status do servidor (sugestão)
- GET /users -> Lista de usuários
- GET /users/:id -> Usuário por id (retorna 404 se não existir)
- GET /cards -> Lista de cards

## Como executar (Windows)
1. Abra o terminal na raiz do projeto:
   PowerShell:
   ```powershell
   cd C:\Users\brnqu\Documents\web_project_around_express
   npm install
   node app.js```
    npm run dev
