#!/bin/bash

# MySQL Setup Script for Product Management App
# This script helps set up the MySQL database for the Laravel application

echo "=== MySQL Setup for Product Management App ==="
echo ""

# Check if MySQL is running
if ! systemctl is-active --quiet mysql; then
    echo "Starting MySQL service..."
    sudo systemctl start mysql
fi

# Create database
echo "Creating database 'product_management'..."
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS product_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import the database dump
echo "Importing database structure and sample data..."
mysql -u root -p product_management < database_dump_mysql.sql

echo ""
echo "=== Setup Complete ==="
echo ""
echo "To configure Laravel to use MySQL, update your .env file with:"
echo "DB_CONNECTION=mysql"
echo "DB_HOST=127.0.0.1"
echo "DB_PORT=3306"
echo "DB_DATABASE=product_management"
echo "DB_USERNAME=root"
echo "DB_PASSWORD=your_mysql_password"
echo ""
echo "Then run: php artisan migrate:status"
echo "to verify the database connection."
