const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/advanced-ecommerce')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
