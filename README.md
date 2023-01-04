# TEKANA E WALLET

## Strategy

```
- I have chosen agile methodology to get this technical evaluation done
- Steps:
 i. Planned the project and created the development road map.
 ii. Breaked down the features and planned MVP release.
 iii. Planned each feature's sprint.
 iv. Daily self evaluation regarding the feature(s) that I have worked on.[more like scrum meeting]
 v. After getting the feature done, I raise the PR and look for a dev around for review, and it get merged after working on all the reviews.
 vi. Challenge myself with what goes well or wrong [more like retrospective meeting]
```

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
$ yarn start:prod | $ npm run start:prod | $ pnpm run start:prod
```

## Endpoints & Models

```
# send POST request on /api/auth/signup using the below model to create an account
{
    "email": "sample@valid.email",
    "password": "Valid@Password#"
}

# send POST request on /api/auth/login using the below model to login
{
    "email": "sample@valid.email",
    "password": "Valid@Password#"
}

# login, copy token and paste into the authorization bearer token
# send POST request on /api/wallets/save using the below model to save
{
    "amount": 500
}

# login, copy token and paste into the authorization bearer token
# send GET request on /api/wallets/balance to check balance

# login, copy token and paste into the authorization bearer token
# send GET request on /api/wallets to view history

# login, copy token and paste into the authorization bearer token
# send GET request on /api/users to get the list of all users

# login, copy token and paste into the authorization bearer token
# send POST request on /api/transactions/send-money using the below model to send money
# make sure that the receiver is the id of a registered user
{
    "amount": 500,
    "receiver": "720a4666-deb9-4ef1-b990-5d893e22cf53"
}

# login, copy token and paste into the authorization bearer token
# send POST request on /api/transactions/withdraw using the below model to withdraw money
{
    "amount": 500
}

# login, copy token and paste into the authorization bearer token
# send GET request on /api/transactions to view history
```

## Author

[@dushimeemma](hhttps://github.com/dushimeemma)
