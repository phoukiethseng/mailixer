FROM php:8.3.4-cli-bullseye

WORKDIR /app

RUN apt-get update && \
    apt-get install -y libpq-dev && \
    docker-php-ext-configure pgsql --with-pgsql=/usr/lib/pgsql && \
    docker-php-ext-install pdo pgsql pdo_pgsql

ENTRYPOINT ["php", "artisan"]

CMD ["serve"]

