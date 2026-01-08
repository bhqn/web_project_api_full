# Projeto 17 – web_project_around_auth

## Descrição
Projeto React "EUA Afora" com **registro e autenticação de usuários**.  
Implementa rotas protegidas, JWT, armazenamento local de token e integração com o back-end do TripleTen.

## Funcionalidades
- **Rotas protegidas**: `/` (apenas usuários autenticados)  
- **Autenticação**:
  - `/signup` – registro de usuário
  - `/signin` – login de usuário
- **Componentes principais**:
  - `Login` – formulário de login
  - `Register` – formulário de registro
  - `ProtectedRoute` – protege rotas privadas
  - `InfoTooltip` – modal de status
- **Persistência de sessão** via `localStorage`  
- Validação de token com `GET /users/me`

## Endpoints do Back-End
Base URL: `https://se-register-api.en.tripleten-services.com/v1`  

- `POST /signup` – criar usuário  
- `POST /signin` – autenticar e obter token  
- `GET /users/me` – validar token e obter email  

> Todos os endpoints protegidos requerem `Authorization: Bearer {token}`

## Estrutura do Projeto
src/
├─ components/
│ ├─ Login.js
│ ├─ Register.js
│ ├─ ProtectedRoute.js
│ └─ InfoTooltip.js
├─ utils/
│ └─ auth.js
├─ App.js
└─ index.js

bash
Copiar código

## Como Rodar
```bash
git clone https://github.com/seu-usuario/web_project_around_auth.git
cd web_project_around_auth
npm install
npm run dev

Observações
Cabeçalho diferente para usuários autorizados e não autorizados (conforme Figma).

Chamadas de API de login/registro centralizadas em auth.js.

Implementação móvel opcional para responsividade.

Checklist de revisão antes de enviar o projeto.

Tecnologias
React | JavaScript | CSS | Fetch API/Axios | JWT | localStorage