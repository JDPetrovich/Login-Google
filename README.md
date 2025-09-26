# Projeto Login Google

Este projeto é uma aplicação full-stack que implementa um sistema de login com autenticação via Google, além de funcionalidades de recuperação e redefinição de senha. O projeto é dividido em duas partes principais: um backend desenvolvido em Node.js com Express e Prisma, e um frontend construído com Next.js e Ant Design.




## Estrutura do Projeto

O projeto é organizado em dois diretórios principais:

- `backend/`: Contém a API RESTful desenvolvida em Node.js.
- `frontend/`: Contém a aplicação web desenvolvida em Next.js.




### Backend (`backend/`)

O backend é uma API Node.js que utiliza o framework Express.js para roteamento e o Prisma como ORM para interação com o banco de dados. Ele é responsável pela autenticação de usuários, incluindo o login via Google, e pelo gerenciamento de recuperação e redefinição de senhas.

**Tecnologias Utilizadas:**

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework web para Node.js.
- **Prisma**: ORM para banco de dados.
- **bcrypt**: Para hash de senhas.
- **jsonwebtoken**: Para geração e verificação de tokens JWT.
- **google-auth-library**: Para autenticação com Google.
- **nodemailer**: Para envio de e-mails (recuperação de senha).
- **dotenv**: Para gerenciamento de variáveis de ambiente.

**Scripts Disponíveis:**

- `start`: Inicia o servidor em modo de produção.
- `dev`: Inicia o servidor em modo de desenvolvimento com `nodemon`.
- `db`: Abre o Prisma Studio para visualização do banco de dados.
- `mg`: Executa migrações do Prisma.
- `gn`: Gera os clientes do Prisma.

**Estrutura de Pastas do Backend:**

```
backend/
├── package.json
├── yarn.lock
└── project/
    ├── scripts/
    │   └── prisma/
    │   │   └── schema.prisma
    │   │   └── .env (Variáveis de ambiente)
    ├── src/
    │   ├── app/
    │   │   ├── context/ (Modelos e Repositórios)
    │   │   ├── helpers/ (Utilitários de autenticação, email, prisma)
    │   │   ├── interfaces/
    │   │   ├── jobs/ (Tarefas agendadas, ex: invalidar códigos expirados)
    │   │   └── services/ (Lógica de negócio)
    │   ├── configs/
    │   │   └── .env (Variáveis de ambiente)
    │   ├── plugins/
    │   │   ├── exceptions/
    │   │   └── server/ (Configuração do servidor, controllers, rotas)
    │   └── index.js (Ponto de entrada da aplicação)
```




### Frontend (`frontend/`)

O frontend é uma aplicação web desenvolvida com Next.js, um framework React, e utiliza o Ant Design para a interface do usuário. Ele oferece a interface para o usuário realizar o login, incluindo a opção de login com Google, e também as telas para recuperação e redefinição de senha.

**Tecnologias Utilizadas:**

- **Next.js**: Framework React para aplicações web.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Ant Design**: Biblioteca de componentes UI para React.
- **ESLint**: Para linting de código.

**Scripts Disponíveis:**

- `dev`: Inicia a aplicação em modo de desenvolvimento.
- `build`: Compila a aplicação para produção.
- `start`: Inicia a aplicação em modo de produção.
- `lint`: Executa o linter.

**Estrutura de Pastas do Frontend:**

```
frontend/
├── package.json
├── next.config.mjs
├── eslint.config.mjs
├── jsconfig.json
├── .env.local
├── public/ (Assets estáticos)
└── src/
    └── app/
        ├── admin/
        │   ├── components/ (Componentes reutilizáveis para a área admin)
        │   └── login/ (Páginas e componentes relacionados ao login e recuperação de senha)
        │       ├── components/ (Componentes específicos de login, ex: GoogleLogin, RecuperarSenhaModal)
        │       ├── login.module.css
        │       └── page.jsx (Página de login)
        ├── globals.css (Estilos globais)
        └── layout.jsx (Layout principal da aplicação)
```




## Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (versão 18 ou superior)
- npm ou Yarn (para o frontend)


### Configuração do Backend

1.  **Navegue até o diretório do backend:**
    ```bash
    cd backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` dentro de `project/src/configs/` com as seguintes variáveis (exemplo):
        ```
    ```
    
    **Exemplo de valores para desenvolvimento (substitua pelos seus):**
    - `PORTA_SERVIDOR=3006`
    - `JWT_SECRET="um_segredo_muito_seguro_e_longo"`
    - `EMAIL_USER="seu_email_do_gmail@gmail.com"`
    - `EMAIL_PASS="sua_senha_de_aplicativo_do_gmail"` (Gerar no Google para apps de terceiros)
    - `GOOGLE_CLIENT_ID="SEU_CLIENT_ID_DO_GOOGLE_AQUI.apps.googleusercontent.com"`
    
    *Nota sobre o banco de dados SQLite: A configuração `DATABASE_URL="file:./dev.db"` é geralmente gerenciada automaticamente pelo Prisma para bancos de dados SQLite, criando o arquivo `dev.db` na raiz do projeto `backend/` após a primeira migração. Não é necessário adicioná-la manualmente ao `.env` a menos que você queira especificar um caminho diferente.*
    *Nota: Para `EMAIL_PASS`, pode ser necessário gerar uma senha de aplicativo para serviços como Gmail.*

4.  **Configure o banco de dados (Prisma):**
    Atualize o `schema.prisma` em `project/scripts/prisma/schema.prisma` conforme necessário. Em seguida, execute as migrações e gere o cliente Prisma:
    ```bash
    npm run mg
    npm run gn
    ```

5.  **Inicie o servidor backend:**
    ```bash
    npm run dev
    # ou npm start (para produção)
    ```
    O servidor estará rodando em `http://localhost:3001` (ou a porta configurada).

### Configuração do Frontend

1.  **Navegue até o diretório do frontend (em uma nova aba do terminal):**
    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz do diretório `frontend/` com as seguintes variáveis (exemplo):
        ```
    ```
    
    **Exemplo de valores para desenvolvimento (substitua pelos seus):**
    - `NEXT_PUBLIC_API_URL="http://localhost:3006"`
    - `NEXT_PUBLIC_GOOGLE_CLIENT_ID="SEU_CLIENT_ID_DO_GOOGLE_AQUI.apps.googleusercontent.com"`

4.  **Inicie a aplicação frontend:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:3000`.

## Funcionalidades

-   **Login com Google**: Autenticação de usuários utilizando suas contas Google.
-   **Login Tradicional**: Autenticação com e-mail e senha.
-   **Recuperação de Senha**: Processo para usuários redefinirem suas senhas através de e-mail.
-   **Redefinição de Senha**: Interface para definir uma nova senha após a recuperação.
-   **Painel Administrativo**: Área protegida por autenticação (implícita na estrutura, mas a implementação específica pode variar).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
