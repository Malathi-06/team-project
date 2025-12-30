# MERN Stack Project

## Project Structure

```
team-project/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── User.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **ODM:** Mongoose
