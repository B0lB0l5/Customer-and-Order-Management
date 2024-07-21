 Customer and Order Management

## Overview

This project is a Node.js application designed for managing customers, products, and orders using MySQL as the database. The application provides functionalities for customer registration and login, product management, and order handling.

## Project Structure

```plaintext
Customer and Order Management/
│
│   └── db/
│       └── connection.js
├── src/
│   ├── modules/
│   │   ├── customers/
│   │   │   ├── customer.controller.js
│   │   │   └── customer.router.js
│   │   ├── products/
│   │   │   ├── product.controller.js
│   │   │   └── product.router.js
│   │   └── orders/
│   │       ├── order.controller.js
│   │       └── order.router.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── index.js

## Features

- **Customer Management**
  - Register new customers
  - Log in and retrieve available products

- **Product Management**
  - Add new products
  - Retrieve revenue by category
  - Retrieve total items sold

- **Order Management**
  - Create new orders
  - Retrieve average order value
  - Retrieve customers with no orders
  - Retrieve top customer by items purchased
  - Retrieve top customers by spending
  - Retrieve customers with 5 or more orders
  - Retrieve percentage of customers with multiple orders
  - Retrieve the customer with the earliest order

## Technologies Used

- **Node.js**: JavaScript runtime for building the API
- **Express.js**: Web framework for Node.js
- **MySQL**: Relational database management system
- **bcrypt**: Library for hashing passwords
- **moment.js**: Library for date and time manipulation

