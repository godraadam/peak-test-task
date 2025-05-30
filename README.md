# PEAK Backend Test Project

## Setup

### Clone repo

```sh
git clone https://github.com/godraadam/peak-test
```

### Setup .env

```sh
cp ./.env.sample > .env.dev
```

Then add your own api key, db url etc.

### Migrate Database

```sh
npx drizzle-kit migrate
```

### Run on local machine

s

```sh
cd ./peak-test
npm i && npm run dev
```

### Run in docker

```sh
docker compose up app
```