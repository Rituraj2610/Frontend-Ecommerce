# E-commerce Frontend

## Simple HTML Frontend for E-commerce

This is a simple frontend for the e-commerce project developed using HTML, inline JavaScript, and CSS. It interfaces with the backend APIs and provides functionalities for users to interact with the platform, including admin, buyer, and seller roles.

---

## **Features Overview**

### Core Features

#### Admin Features:
- Admin login and dashboard management for overseeing user and product admins, sellers, and products.
- Ability to manage users, delete sellers, and track orders and reviews.

#### Buyer Features:
- Buyer registration and login for purchasing products, managing cart, and viewing orders.
- View products, search, filter, and manage reviews.

#### Seller Features:
- Seller login and dashboard for managing their products, orders, and reviews.
- Ability to upload new products, update product information, and track orders.

---

## Backend
- The Backend for this project is available on GitHub.

  [Backend Repository](https://github.com/Rituraj2610/Ecommerce-Spring-Boot)

---

## **Frontend Files and Instructions**

### Admin Login
- **adminLogin.html**: Admin login page for signing in to the admin panel.  

### User Login (Buyer)
- **index.html**: Login page for buyers to sign in and start shopping.

### Seller Dashboard
- **seller-dashboard/index.html**: Seller dashboard to manage products, orders, and more.

### How to Install
1. Clone the repository.
2. Open the desired HTML file (for Admin, User, or Seller) in a web browser.
3. Ensure the backend APIs are running on `http://localhost:8080` as expected.
4. The frontend interacts with the backend via the listed APIs.

---

## **API List**

### Admin
#### Super Admin:
- **POST** `http://localhost:8080/admin/register` - Register a new super admin.
- **POST** `http://localhost:8080/admin/login` - Admin login.
- **GET** `http://localhost:8080/admin/superadmin/dashboard/useradmins` - View all user admins.
- **GET** `http://localhost:8080/admin/superadmin/dashboard/productadmins` - View all product admins.
- **POST** `http://localhost:8080/admin/superadmin/dashboard/admins` - Add new admins.
- **DELETE** `http://localhost:8080/admin/superadmin/dashboard/admins` - Delete an admin.
- **GET** `http://localhost:8080/admin/superadmin/dashboard/sellers` - View all sellers.
- **GET** `http://localhost:8080/admin/superadmin/dashboard/products` - View all products.
- **DELETE** `http://localhost:8080/admin/superadmin/dashboard/delete-seller` - Delete a seller.

#### Product Admin:
- **GET** `http://localhost:8080/admin/productadmin/dashboard/sellers` - View all sellers.
- **GET** `http://localhost:8080/admin/productadmin/dashboard/products` - View all products.
- **DELETE** `http://localhost:8080/admin/productadmin/dashboard/delete-seller` - Delete a seller.

#### User Admin:
- **GET** `http://localhost:8080/admin/useradmin/dashboard/users` - View all users.
- **DELETE** `http://localhost:8080/admin/useradmin/dashboard/user` - Delete a user.
- **GET** `http://localhost:8080/admin/useradmin/dashboard/user-orders` - View user orders.

### Home
- **GET** `http://localhost:8080/dashboard` - Access the main dashboard page.
- **POST** `http://localhost:8080/seller/register` - Register a new seller.
- **POST** `http://localhost:8080/seller/otp` - Seller OTP verification.
- **POST** `http://localhost:8080/seller/login` - Seller login.
- **POST** `http://localhost:8080/buyer/register` - Register a new buyer.
- **POST** `http://localhost:8080/buyer/otp` - Buyer OTP verification.
- **POST** `http://localhost:8080/buyer/login` - Buyer login.

### Buyer
- **GET** `http://localhost:8080/api/v1/buyer/dashboard/products` - View products for buyers.
- **GET** `http://localhost:8080/api/v1/buyer/cart` - View items in the buyer's cart.
- **POST** `http://localhost:8080/api/v1/buyer/cart` - Add an item to the cart.
- **DELETE** `http://localhost:8080/api/v1/buyer/cart` - Remove an item from the cart.
- **GET** `http://localhost:8080/api/v1/buyer/orders` - View buyer's orders.
- **POST** `http://localhost:8080/api/v1/buyer/order` - Place a new order.
- **DELETE** `http://localhost:8080/api/v1/buyer/order` - Cancel an order.
- **GET** `http://localhost:8080/api/v1/buyer/product/review` - View reviews for a product.
- **POST** `http://localhost:8080/api/v1/buyer/product/review` - Add a review to a product.
- **DELETE** `http://localhost:8080/api/v1/buyer/product/review` - Delete a review for a product.

### Seller
- **GET** `http://localhost:8080/api/v1/seller/get-product` - Get details of a seller's product.
- **POST** `http://localhost:8080/api/v1/seller/product` - Add a new product.
- **GET** `http://localhost:8080/api/v1/seller/products/name` - Search products by name.
- **GET** `http://localhost:8080/api/v1/seller/products/category` - Filter products by category.
- **GET** `http://localhost:8080/api/v1/seller/products/price` - Filter products by price.
- **DELETE** `http://localhost:8080/api/v1/seller/product` - Delete a product.
- **PUT** `http://localhost:8080/api/v1/seller/product` - Update a product.
- **GET** `http://localhost:8080/api/v1/seller/get-orders` - View seller orders.
- **GET** `http://localhost:8080/api/v1/seller/get-orders-by-status` - View orders by status.
- **PUT** `http://localhost:8080/api/v1/seller/put-order` - Update an order's status.

---

## **Known Issues**

- **Alert Messages**: Some alert messages may not display the correct information due to mismatched data in JavaScript.
- **UI Loading**: The dynamic content loading is not as smooth as expected. A better CSS framework and additional optimizations can improve this.
- **CSS Styling**: The current styling is basic and can be enhanced for a better user interface experience.

---

This README should help you set up and understand the basic functionality of the frontend. For any further assistance or contributions, please reach out to the project maintainers.
