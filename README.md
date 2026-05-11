# E-Commerce Store - Full Stack Java Spring Boot Project

## 📋 Project Overview

A complete full-stack e-commerce store application built with **Java Spring Boot** backend and **React** frontend (frontend ready to integrate). This project includes user authentication, product management, shopping cart, and order processing.

## ✨ Features

### Backend Features
- ✅ **User Authentication & Authorization**
  - User registration and login
  - JWT token-based authentication
  - Secure password encoding with BCrypt

- ✅ **Product Management**
  - Add, update, delete, and search products
  - Category-based filtering
  - Pagination support
  - Product inventory management

- ✅ **Shopping Cart**
  - Add items to cart
  - Update item quantities
  - Remove items from cart
  - Clear cart
  - Calculate cart totals

- ✅ **Order Management**
  - Create orders from cart
  - View order history
  - Track order status
  - Order item details

- ✅ **Security**
  - CORS enabled for frontend integration
  - Request validation
  - Exception handling
  - Security headers

## 🛠 Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.1.5**
- **Spring Data JPA**
- **Spring Security**
- **JWT (JSON Web Token)**
- **MySQL Database**
- **Maven**
- **Lombok**

### Database
- **MySQL 8.0**
- **Docker Support**

## 📦 Project Structure

```
ecommerce-store/
├── src/
│   ├── main/
│   │   ├── java/com/ecommerce/
│   │   │   ├── model/              # Database entities
│   │   │   ├── repository/         # JPA repositories
│   │   │   ├── service/            # Business logic
│   │   │   ├── controller/         # REST endpoints
│   │   │   ├── dto/                # Data transfer objects
│   │   │   ├── security/           # Security & JWT
│   │   │   ├── exception/          # Custom exceptions
│   │   │   ├── config/             # Spring configuration
│   │   │   └── EcommerceStoreApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
├── Dockerfile
├── docker-compose.yml
├── API_TESTING.md
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.9+
- MySQL 8.0+
- Docker & Docker Compose (optional)

### Installation

#### Option 1: Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-store
   ```

2. **Create MySQL Database**
   ```bash
   mysql -u root -p
   CREATE DATABASE ecommerce_store;
   EXIT;
   ```

3. **Configure Database**
   Update `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_store
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

4. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The API will be available at: `http://localhost:8080/api`

#### Option 2: Docker Setup

1. **Build and Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

   The API will be available at: `http://localhost:8080/api`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "1234567890",
  "address": "123 Main St",
  "city": "New York",
  "zipCode": "10001",
  "country": "USA"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### Get All Products
```
GET /api/products?page=0&size=10
```

#### Search Products
```
GET /api/products/search?name=laptop
```

#### Get Products by Category
```
GET /api/products/category/Electronics?page=0&size=10
```

#### Create Product (Requires Auth)
```
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "quantity": 50,
  "category": "Electronics",
  "sku": "LAP001",
  "imageUrl": "https://example.com/laptop.jpg"
}
```

### Cart Endpoints (Requires Authentication)

#### Get Cart
```
GET /api/cart
Authorization: Bearer {token}
```

#### Add to Cart
```
POST /api/cart/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```

#### Update Cart Item
```
PUT /api/cart/{cartItemId}?quantity=5
Authorization: Bearer {token}
```

#### Remove from Cart
```
DELETE /api/cart/{cartItemId}
Authorization: Bearer {token}
```

#### Get Cart Total
```
GET /api/cart/total
Authorization: Bearer {token}
```

### Order Endpoints (Requires Authentication)

#### Create Order
```
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shippingAddress": "456 Oak St, New York, NY 10001",
  "phoneNumber": "9876543210"
}
```

#### Get User Orders
```
GET /api/orders?page=0&size=10
Authorization: Bearer {token}
```

#### Get Order by ID
```
GET /api/orders/{id}
Authorization: Bearer {token}
```

#### Update Order Status (Admin)
```
PUT /api/orders/{id}/status?status=SHIPPED
Authorization: Bearer {token}
```

## 🧪 Testing

For detailed API testing examples using Postman and cURL, see [API_TESTING.md](./API_TESTING.md)

### Quick Test Example

```bash
# Register User
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Get All Products
curl http://localhost:8080/api/products
```

## 📝 Environment Variables

Create a `.env` file or update `application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_store
spring.datasource.username=root
spring.datasource.password=root

# JWT
app.jwtSecret=your-secret-key-here
app.jwtExpirationMs=86400000

# Server
server.port=8080
```

## 🔒 Security Features

- **JWT Authentication**: Token-based stateless authentication
- **Password Encryption**: BCrypt password encoding
- **CORS**: Configured for frontend integration
- **Request Validation**: All inputs are validated
- **Exception Handling**: Comprehensive error handling
- **Authorization**: Role-based access control ready

## 📊 Database Schema

### Tables
- `users` - User profiles and credentials
- `products` - Product catalog
- `carts` - Shopping carts
- `cart_items` - Items in shopping carts
- `orders` - Customer orders
- `order_items` - Items in orders

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please create an issue in the repository.

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Inventory management
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] React frontend integration
- [ ] Mobile app support

---

**Made with ❤️ for e-commerce enthusiasts**