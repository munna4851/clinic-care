FROM php:8.2-apache

# Install system packages, sqlite3, and PHP extensions needed for Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip git curl sqlite3 libsqlite3-dev \
    && docker-php-ext-install pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd

# Install Node.js & npm
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . .

# Set Apache document root to public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Install PHP dependencies & build frontend assets
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Ensure database directory exists with Apache permissions
RUN mkdir -p /var/www/html/database \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database

EXPOSE 80

# Entrypoint script: Create database file, run migration, set www-data ownership, and start Apache
CMD bash -c "touch /var/www/html/database/database.sqlite && \
    chmod 777 /var/www/html/database/database.sqlite && \
    php artisan migrate --force && \
    chown -R www-data:www-data /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache && \
    apache2-foreground"