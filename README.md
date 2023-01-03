# TEKANA E WALLET

## Prerequisites

```
- Node.js
- yarn | npm | pnpn
- docker
```

## Installation

```
$ yarn | $ npm install | $ pnpm install
```

## Running the application

```
# environment variables
$ touch .env.dev && cp .env.example .env.dev
# provide your environment variables

# docker
$ touch docker.env && cp docker.env.example docker.env
# make sure that docker is running on your local machine
$ docker-compose up

# development
$ yarn start | $ npm run start | $ pnpm run start

# development watch mode
$ yarn start:dev | $ npm run start | $ pnpm run start

# production
$ yarn start:dev | $ npm run start:dev | $ pnpm run start:dev
```

## Endpoints & Models

```
# /api/auth/signup
{
    "email": "sample@valid.email",
    "password": "Valid@Password#"
}
# /api/auth/login
{
    "email": "sample@valid.email",
    "password": "Valid@Password#"
}
```

## Author

[@dushimeemma](hhttps://github.com/dushimeemma)
