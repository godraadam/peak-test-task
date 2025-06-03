# PEAK Backend Test Project

## Setup

### Clone repo

```sh
git clone https://github.com/godraadam/peak-test-task
```

### Setup .env

```sh
cp ./.env.sample > .env.dev
```

Then add your own api key, db url etc.

Or if running in Docker

```sh
cp ./.env.sample > .env.docker
```

And make sure to add `PG_CONNECTION_STRING=postgres://postgres:postgres@db:5432/peak-test`

### Migrate Database

```sh
npx drizzle-kit migrate
```

### Seed database with random stocks

```sh
tsx ./src/db/seed.ts
```

### Run on local machine

```sh
cd ./peak-test
npm i && npm run dev
```

### Run in docker

```sh
docker compose up
```

## API call examples

### `http` syntax
They are found in the `http` folder, and they can be run (for example) with the REST client VSCode extension.

### Swagger
Start the dev server and go to `/api/v1/docs` to explore the Swagger document.

## Tech stack

- PostgreSQL
- [DrizzleORM](https://orm.drizzle.team/) (chosen over Prisma because of more SQL-like syntax, TypeScript schema definition and better migration system)
- ExpressJS
- TypeScript
- [Zod](https://zod.dev/)
- Docker

## Remarks

- I chose to simply store stock price updates in their own table, and then calculate currrent price and rolling average, on-demand based on them. However, if the request count/second is expected to be high it would be more efficient to calculate that every time we fetch stock information and to save it, instead of doing that calculation for every request.
- I didn't find any stock API that would let me query current price for multiple stocks in one request, so had to resort to making a requests for each one separately.
- Stuck to mostly standard split-by-responsibility (so services, api handlers, data access layer each in their corrresponding folder) instead of splitting the code by concern (all stock related stuff in stock folder, including router handler, service, dto, dao and the like), although I think the former is more logical.
- I forgot about the Swagger bonus points, so I added them __after__ the submission deadline.


