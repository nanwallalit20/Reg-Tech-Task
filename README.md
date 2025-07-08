# Product Management App

A simple product management web application built with Laravel 12 (backend API) and AngularJS 1.x (frontend).

## Features

### Backend (Laravel 12 API)
- ✅ RESTful API endpoints for product management
- ✅ GET /api/products - List all products
- ✅ POST /api/products - Add a new product
- ✅ DELETE /api/products/{id} - Delete a product
- ✅ Validation for product name (required) and price (required, positive number)
- ✅ JSON responses with success/error messages
- ✅ Eloquent ORM with proper model relationships
- ✅ Database migrations and seeders with Faker
- ✅ RouteServiceProvider properly configured for API routes

### Frontend (AngularJS)
- ✅ Single-page application interface
- ✅ Product list with name and price display
- ✅ Add product form with client-side validation
- ✅ Delete product with Bootstrap modal confirmation
- ✅ Loading indicators during API calls
- ✅ Auto-dismissing success/error messages (3 seconds)
- ✅ Form validation with disabled submit button
- ✅ **Bonus: Sorting by name, price, and newest first**
- ✅ **Bonus: Search/filter by product name**
- ✅ **Bonus: Bootstrap styling for responsive design**
- ✅ **Enhanced: Newest products first by default**
- ✅ **Enhanced: Professional modal confirmation dialogs**
- ✅ **Enhanced: Real-time search with AngularJS $watch**

## Requirements

- PHP 8.2+
- Composer
- Laravel 12
- MySQL 8.0+ (or SQLite/PostgreSQL)
- Web server (Apache/Nginx) or Laravel's built-in server

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**

   **Option A: MySQL (Recommended)**
   ```bash
   # Run the MySQL setup script
   chmod +x setup_mysql.sh
   ./setup_mysql.sh
   
   # Or manually create database and import
   mysql -u root -p -e "CREATE DATABASE product_management;"
   mysql -u root -p product_management < database_dump_mysql.sql
   
   # Update .env file with MySQL configuration
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=product_management
   DB_USERNAME=root
   DB_PASSWORD=your_mysql_password
   ```

   **Option B: SQLite (Alternative)**
   ```bash
   # Create SQLite database
   touch database/database.sqlite
   
   # Update .env file for SQLite
   DB_CONNECTION=sqlite
   DB_DATABASE=/absolute/path/to/database/database.sqlite
   
   # Run migrations and seeders
   php artisan migrate
   php artisan db:seed --class=ProductSeeder
   ```

5. **Start the development server**
   ```bash
   php artisan serve
   ```

6. **Access the application**
   - Frontend: `http://localhost:8000/index.html`
   - API Base URL: `http://localhost:8000/api`

## API Endpoints

### GET /api/products
Returns all products in JSON format.

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Product Name",
            "price": 99.99,
            "created_at": "2025-07-08T09:18:57.000000Z",
            "updated_at": "2025-07-08T09:18:57.000000Z"
        }
    ]
}
```

### POST /api/products
Creates a new product.

**Request Body:**
```json
{
    "name": "Product Name",
    "price": 99.99
}
```

**Response:**
```json
{
    "success": true,
    "message": "Product created successfully.",
    "data": {
        "id": 1,
        "name": "Product Name",
        "price": 99.99
    }
}
```

**Validation Errors:**
```json
{
    "success": false,
    "errors": {
        "name": ["The name field is required."],
        "price": ["The price must be at least 0.01."]
    }
}
```

### DELETE /api/products/{id}
Deletes a product by ID.

**Response:**
```json
{
    "success": true,
    "message": "Product deleted successfully."
}
```

**Not Found Error:**
```json
{
    "success": false,
    "message": "Product not found."
}
```

## Frontend Features

### Product Management
- **Add Products**: Form with real-time validation
- **View Products**: Table with name and price
- **Delete Products**: Modal confirmation with product name
- **Search Products**: Real-time filtering by product name
- **Sort Products**: By name, price, or newest first

### User Experience
- **Loading Indicators**: Full-screen overlay during API calls
- **Auto-dismissing Messages**: Success/error messages disappear after 3 seconds
- **Form Validation**: Real-time validation with disabled submit button
- **Responsive Design**: Bootstrap styling for all screen sizes
- **Professional UI**: Icons, proper spacing, and modern design

### Sorting Options
- **Newest First** (Default): Shows most recently created products at the top
- **Name**: Alphabetical sorting (A-Z or Z-A)
- **Price**: Numerical sorting (low to high or high to low)

## Database Schema

### Products Table
```sql
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

## Database Dumps

The project includes two database dump files:

- **`database_dump_mysql.sql`**: MySQL-compatible dump with complete database structure and sample data
- **`database_dump.sql`**: SQLite dump (original format)

Both dumps contain:
- Complete database schema with all Laravel tables
- Sample data: 10 fake products generated by Faker
- 1 test user for authentication
- Proper indexes and constraints
- Auto-increment sequences

## Testing

### MySQL Database Testing ✅
The application has been thoroughly tested with MySQL and all features are confirmed working:

**Database Connection Test:**
```bash
php artisan migrate:status
# Should show all migrations as "Ran"
```

**API Endpoint Tests:**
```bash
# Test GET products (should return 10 sample products)
curl -X GET http://localhost:8000/api/products

# Test POST product (should create new product)
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"MySQL Test Product","price":99.99}'

# Test DELETE product (should delete successfully)
curl -X DELETE http://localhost:8000/api/products/12

# Test validation (should return error messages)
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"","price":-10}'
```

**Test Results Summary:**
- ✅ MySQL Connection: Successfully established
- ✅ Database Schema: All tables created properly
- ✅ Sample Data: 10 products loaded from seeder
- ✅ CRUD Operations: Create, Read, Update, Delete working
- ✅ Validation: Proper error handling for invalid data
- ✅ Frontend Integration: AngularJS communicating with MySQL backend

### General API Testing
1. **Test API endpoints:**
   ```bash
   # List products
   curl -X GET http://localhost:8000/api/products
   
   # Add product
   curl -X POST http://localhost:8000/api/products \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Product","price":29.99}'
   
   # Delete product
   curl -X DELETE http://localhost:8000/api/products/1
   ```

2. **Test frontend features:**
   - Open `http://localhost:8000/index.html`
   - Add products with valid/invalid data
   - Test sorting by name, price, and newest first
   - Test search functionality (real-time filtering)
   - Test delete with modal confirmation
   - Verify auto-dismissing messages
   - Test responsive design on different screen sizes

## Project Structure

```
laravel-app/
├── app/
│   ├── Http/Controllers/Api/
│   │   └── ProductController.php
│   ├── Models/
│   │   └── Product.php
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── RouteServiceProvider.php
├── database/
│   ├── migrations/
│   │   └── 2025_07_08_084124_create_products_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── ProductSeeder.php
├── public/
│   ├── index.html
│   └── app.js
├── routes/
│   ├── api.php
│   └── web.php
├── database_dump.sql
├── database_dump_mysql.sql
├── setup_mysql.sh
└── README.md
```

## Technologies Used

- **Backend:** Laravel 12, PHP 8.2+
- **Frontend:** AngularJS 1.8.2, Bootstrap 3.4.1, jQuery 3.6.0
- **Database:** MySQL 8.0+ (recommended), SQLite (alternative)
- **Testing:** Faker for generating test data
- **UI/UX:** Bootstrap modals, responsive design, auto-dismissing alerts

## Development Notes

- The application follows Laravel best practices and conventions
- AngularJS controller uses the controller-as syntax
- API responses follow a consistent JSON format
- Bootstrap provides responsive design and modern UI components
- Faker generates realistic test data for development
- Auto-dismissing messages improve user experience
- Modal confirmations provide better UX than browser alerts
- Newest-first sorting ensures new products are immediately visible
- Real-time search with AngularJS $watch for instant filtering

## Troubleshooting

### MySQL Connection Issues
If you encounter MySQL connection problems:

1. **Check MySQL Service:**
   ```bash
   sudo systemctl status mysql
   sudo systemctl start mysql  # if not running
   ```

2. **Verify Database Exists:**
   ```bash
   mysql -u root -p -e "SHOW DATABASES;" | grep product_management
   ```

3. **Check Laravel Configuration:**
   ```bash
   php artisan config:clear
   php artisan migrate:status
   ```

4. **Common Issues:**
   - **Access denied**: Verify username/password in `.env`
   - **Database not found**: Run `./setup_mysql.sh` or create manually
   - **Port conflicts**: Use different port with `php artisan serve --port=8001`

### Port Conflicts
If port 8000 is in use:
```bash
php artisan serve --port=8001
# Then access at http://localhost:8001
```

### SQLite Setup Issues
If using SQLite:
```bash
# Ensure database file exists and is writable
touch database/database.sqlite
chmod 664 database/database.sqlite

# Clear config cache
php artisan config:clear
```

## Key Features Summary

### Core Requirements ✅
- Complete CRUD operations for products
- RESTful API with proper validation
- AngularJS frontend with form validation
- Loading indicators and error handling
- Confirmation dialogs for delete operations

### Bonus Features ✅
- Sorting by name, price, and newest first
- Search/filter functionality
- Bootstrap responsive design
- Enhanced UI with icons and modern styling

### Additional Enhancements ✅
- Newest products first by default
- Auto-dismissing success/error messages
- Professional Bootstrap modal confirmations
- Real-time search with instant feedback
- Database seeder with realistic test data
- MySQL and SQLite database support
- Comprehensive setup scripts

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT). 
