const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/advanced-ecommerce')
    .then(async () => {
        console.log('MongoDB Connected for Seeding');

        try {
            const email = 'admin@example.com';
            const password = 'password123';

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                console.log('Admin user already exists');
                process.exit(0);
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const adminUser = new User({
                name: 'Admin User',
                email,
                passwordHash,
                role: 'admin'
            });

            await adminUser.save();
            console.log(`Admin user created: ${email} / ${password}`);
            process.exit(0);
        } catch (error) {
            console.error('Seeding error:', error);
            process.exit(1);
        }
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
