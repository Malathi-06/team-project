The project is a MERN Stack "Advanced E-commerce Catalog" application. It is a full-featured e-commerce platform designed to handle product browsing, user accounts, shopping cart functionality, and administrative management.

Key Components
Tech Stack:

Frontend: React 19 (via Vite), React Router DOM (v7), Lucide React (for icons), and Recharts (for analytics).
Backend: Node.js, Express.js.
Database: MongoDB with Mongoose (v9.1.2) for object modeling.
Authentication: JWT (JSON Web Tokens) and bcryptjs for secure password hashing.
Tooling: Concurrently (for simultaneous dev server startup), Nodemon, ESLint.
Core Features & Structure:

User Capabilities:
Authentication: Login and Registration pages (
Login.jsx
, 
Register.jsx
).
Shopping: ProductCatalog, ProductDetail, and Home page likely featuring products.
Transactions: Cart management and Checkout process.
Account: UserProfile, Wishlist management.
Support: Support and Policies pages.
Administrative & Seller Features:
Admin Dashboard: A dedicated admin section (client/src/pages/admin/) including:
Dashboard.jsx (likely statistics/overview).
Products.jsx & ProductFormPage.jsx for catalog management.
Orders.jsx for order processing.
Users.jsx for user management.
Seller Interface: A specific SellerDashboard.jsx suggests multi-vendor or seller capabilities.
Data Models (Backend):
Comprehensive schema support including: User, Product, Order, Category, Cart, Review, Wishlist, Payment, Discount, Notification, AuditLog, and Seller.
Project State: The project is currently set up with a split client/server architecture. The root package.json contains scripts to install dependencies and run both servers concurrently (npm run dev). The presence of detailed models like AuditLog and Discount indicates an ambition for "advanced" enterprise-grade features beyond a simple shop.
