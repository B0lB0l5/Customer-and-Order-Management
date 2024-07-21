# Customer and Order Management

## Overview

This project is a Node.js application designed for managing customers, products, and orders using MySQL as the database. The application provides functionalities for customer registration and login, product management, and order handling.

## Project Structure

```plaintext
Customer-and-Order-Management/
│── db/
│   ├── connection.js
├── src/
│   ├── modules/
│   │   ├── customers/
│   │   │   ├── customer.controller.js
│   │   │   ├── customer.router.js
│   │   ├── products/
│   │   │   ├── product.controller.js
│   │   │   ├── product.router.js
│   │   ├── orders/
│   │   │   ├── order.controller.js
│   │   │   ├── order.router.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│── index.js
├── .gitignore
├── README.md
├── package.json
