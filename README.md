# Gerenciamento de Livros

Este projeto é um sistema de gerenciamento de livros que consiste em um backend (Java/Spring Boot) e um frontend (React/Node.js). Ele utiliza Docker e Docker Compose para facilitar a configuração e execução do ambiente de desenvolvimento.

## Estrutura do Projeto

- `book-management/`: Contém o código-fonte do backend (Java/Spring Boot).
- `book-management-front/`: Contém o código-fonte do frontend (React).
- `docker-compose.yml`: Define os serviços Docker para o backend, frontend e banco de dados PostgreSQL.
- `README.md`: Este arquivo.

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como Executar o Projeto com Docker Compose

Siga os passos abaixo para configurar e executar o projeto usando Docker Compose:

1.  **Clone o repositório** (se ainda não o fez):

    ```bash
    git clone https://github.com/seu-usuario/system-book-management.git
    cd system-book-management
    ```

2.  **Construa e inicie os serviços Docker**:

    No diretório raiz do projeto (onde o `docker-compose.yml` está localizado), execute o seguinte comando:

    ```bash
    docker-compose up --build
    ```

    Este comando irá:
    - Construir as imagens Docker para o backend e o frontend (se ainda não existirem ou se houver alterações nos Dockerfiles).
    - Criar e iniciar os contêineres para o banco de dados PostgreSQL, o backend e o frontend.
    - O backend aguardará o banco de dados estar saudável antes de iniciar.

3.  **Acesse a Aplicação**:

    - **Frontend**: Uma vez que todos os serviços estejam em execução, você pode acessar a aplicação frontend em seu navegador:
        [http://localhost:3000](http://localhost:3000)

    - **Backend (API)**: A API do backend estará disponível em:
        [http://localhost:8080](http://localhost:8080)

## Parar e Remover os Serviços

Para parar os serviços e remover os contêineres, redes e volumes criados pelo Docker Compose, execute:

```bash
docker-compose down -v
```

O `-v` é importante para remover os volumes de dados do banco de dados, garantindo um ambiente limpo na próxima vez que você iniciar os serviços.

## Desenvolvimento

### Backend (book-management)

-   **Tecnologia**: Java, Spring Boot, Maven
-   **Porta**: 8080
-   **Dockerfile**: `book-management/Dockerfile`

### Frontend (book-management-front)

-   **Tecnologia**: React, Node.js, Nginx
-   **Porta**: 3000 (mapeada para a porta 80 do Nginx no contêiner)
-   **Dockerfile**: `book-management-front/Dockerfile`

### Banco de Dados

-   **Tecnologia**: PostgreSQL
-   **Nome do Banco de Dados**: `bookdb`
-   **Usuário**: `postgres`
-   **Senha**: `postgres`
-   **Porta**: 5432
