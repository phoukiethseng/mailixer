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

## Setup Postgresql Database

Make sure you have [Docker](https://docs.docker.com/desktop/) Installed

```
docker compose up -d
```

## Copy Environment File

Copy all cotent of `.env.example` into `.env`

```shell
cp .env.example .env
```

Change database connection configuration in `.env`

-   DB_CONNECTION=pgsql
-   DB_HOST=127.0.0.1
-   DB_PORT=8080
-   DB_DATABASE=mailixer
-   DB_USERNAME=app
-   DB_PASSWORD=example

## Migrate Database

```shell
php artisan migrate
```

## Seed Database

```shell
php artisan db:seed
```

## Start Development Server

Open a terminal, run the following command
Laravel

```shell
php artisan serve
```

Open another terminal, run the following command
Vite

```shell
npm run dev
```

## Visit website

Go to `http:://localhost:8000` or `http://127.0.0.1:8000`
