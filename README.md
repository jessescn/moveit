# MoveIt 🦾💻

Aplicação que te estimula a se exercitar enquanto você trabalha!

![home](https://github.com/jessescn/nlw-moveit/blob/main/prints/login.PNG)

## Tecnologias

As tecnologias utilizadas no projeto foram Next.js e React.

O backend em Node para login e persistência dos dados está na pasta `/backend` é foi feita utilizando NodeJS + express e para persistência dos dados foi utilizando Mongodb.

## Instalação

Caso você tenha interesse em executar este projeto localmente, basta executar os comandos abaixo (PS. esse projeto utiliza yarn):

## Backend

```bash

# instalação das dependências
$ cd backend && yarn install

# executar o projeto
$ yarn dev

```

O servidor irá ficar executando na porta 8080. É necessário criar um arquivo **.env** seguindo o modelo do arquivo **.env.example**, configurando o link do mongodb.

## Aplicação

```bash

# instalação das dependências
$ yarn install

# executar o projeto
$ yarn dev

```

A aplicação irá rodar na porta 3000. É necessário configurar as variáveis de ambiente em um arquivo **.env.local** na raiz do projeto, seguindo o modelo presente no arquivo **.env.example**. 
