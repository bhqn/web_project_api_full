# Around — React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Around (projeto do curso)

Aplicação React (Vite) de exemplo que usa React Tools, Hooks e React Router. Implementa um pequeno sistema de perfil + galeria de cards com popups (modais) — incluindo formulário de edição de perfil/avatar, criação de novo card e visualização ampliada de imagem.

Tecnologias
- React (functional components + Hooks)
- Vite (bundler / dev server)
- React Router (rotas, se presente)
- Context API (CurrentUserContext)
- Fetch API encapsulada em src/utils/api.js
- CSS modular em src/blocks (popup.css, edit.css, etc.)

Principais componentes
- Header — logo e navegação
- Main — área principal; renderiza lista de Card e deve conter o componente Popup
- Card — item da galeria (curtir, excluir, clique na imagem para abrir modal)
- Popup — modal genérico (usa prop isImagePopup para variar o layout)
- ImagePopup — modal de visualização da imagem
- EditProfile / EditAvatar / NewCard — formulários dentro do Popup
- Footer

Estrutura (resumida)
- src/
  - components/
    - App.jsx
    - Header/
    - Main/
      - Main.jsx
      - components/
        - Card/
        - Popup/
          - Popup.jsx
          - popup.css
        - ImagePopup/
    - Footer/
  - blocks/ (CSS globais: popup.css, edit.css, etc.)
  - utils/
    - api.js
  - images/

Instalação (Windows)
1. Instalar dependências:
   npm install

2. Rodar em desenvolvimento:
   npm run dev
   (Abra http://localhost:5173 ou a porta mostrada pelo Vite)

3. Build para produção:
   npm run build

4. Preview do build:
   npm run preview

Variáveis / configuração da API
- A URL base e o header (token) estão em src/utils/api.js. Ajuste se necessário:
  - baseUrl (ex.: https://api.exemplo.com/v1)
  - headers.authorization
  - Content-Type já configurado como application/json

Sobre o _makeRequest (api.js)
- Centraliza chamadas fetch montando URL: `${baseUrl}${endpoint}`.
- Recebe `endpoint` (string) e `options` (method, body, headers).
- Chama _handleServerResponse para transformar res.ok em res.json() ou rejeitar com erro.

Como o Popup deve ser usado 
- O componente Popup precisa ser renderizado dentro do componente Main.
- Main deve receber via props o estado `popup` e `selectedCard` do App e renderizar:
  {popup && (
    <Popup
      onClose={handleClosePopup}
      isImagePopup={popup === 'imagePopup'}
      title={...}
    >
      {popup === 'newCard' && <NewCard ... />}
      {popup === 'imagePopup' && <ImagePopup card={selectedCard} />}
      ...
    </Popup>
  )}

Dicas comuns / troubleshooting
- Classes CSS do Popup:
  - Para que só uma classe seja aplicada use:
    className={isImagePopup ? 'popup__content_content_image' : 'popup__content'}
- Garantir props:
  - Ao abrir modal de imagem, passar selectedCard e isImagePopup para o Popup.
- Imagem do botão fechar invisível:
  - Verifique caminho e nome do arquivo (maiúsculas/minúsculas) em src/images e referência em popup.css.
  - Teste com background-color temporário para depurar.
- Fast Refresh: cada arquivo de componente deve exportar algo (export default) para HMR funcionar.

Testes
- Se usar Jest/Testing Library, rode:
  npm test





Licença
- Projeto de estudo / curso.

