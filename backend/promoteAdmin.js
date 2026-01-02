const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const promoteUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const email = 'amirtha2314@gmail.com';
        const user = await User.findOneAndUpdate(
            { email },
            { role: 'admin' },
            { new: true }
        );

        if (user) {
            console.log(`Success! User ${email} is now an ADMIN.`);
            console.log('User Data:', {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            console.log(`Error: User with email ${email} not found.`);
        }

        process.exit();
    } catch (error) {
        console.error('Promotion failed:', error);
        process.exit(1);
    }
};

promoteUser();
