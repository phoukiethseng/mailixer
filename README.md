# Mailixer

Mailixer is a web-based platform that allows users to effortlessly design and host email newsletter webpages for their audience to subscribe to. Mailixer also handles the delivery and management of the email newsletters, saving users time and hassle. Mailixer is the ultimate solution for email newsletter creation and distribution.

# Get Started

## Install Dependencies

PHP dependencies

```shell
composer update
```

NPM Dependencies

```shell
npm install
```

## Copy Environment File

Copy all cotent of `.env.example` into `.env`

```shell
cp .env.example .env
```

Change database connection configuration in `.env`

- DB_CONNECTION=pgsql
- DB_HOST=postgres
- DB_PORT=5432
- DB_DATABASE=mailixer
- DB_USERNAME=app
- DB_PASSWORD=example

## Start up service containers

Make sure you have [Docker](https://docs.docker.com/desktop/) Installed.
This will start up PHP server, Vite server, A single queue worker
and PostgreSQL database all running in separate container (See:`docker-compose.yml`).

```shell
docker compose up -d
```

## (Optional) Database migration and seeding

Since we run PHP inside container, we need to invoke migration command inside `app` service container

```shell
docker compose exec -t app php artisan migrate
```

For database seeding:

```shell
docker compose exec -t app php artisan db:seed
```

## Visit website

Go to `http:://localhost` or `http://127.0.0.1`
