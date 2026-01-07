const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Seller = require('../models/Seller');

mongoose.connect('mongodb://localhost:27017/advanced-ecommerce')
    .then(async () => {
        console.log('MongoDB Connected for Product Seeding');

        try {
            // 1. Get Admin User
            const user = await User.findOne({ email: 'admin@example.com' });
            if (!user) {
                console.error('Admin user not found. Run seed-users.js first.');
                process.exit(1);
            }

            // 2. Create Seller
            let seller = await Seller.findOne({ user: user._id });
            if (!seller) {
                seller = new Seller({
                    user: user._id,
                    storeName: 'TechGizmos',
                    description: 'Your one-stop shop for cool tech',
                    status: 'approved'
                });
                await seller.save();
                console.log('Seller created');
            } else {
                console.log('Seller already exists');
            }

            // 3. Create Categories
            const categories = [
                { name: 'Electronics', slug: 'electronics', description: 'Gadgets and devices' },
                { name: 'Clothing', slug: 'clothing', description: 'Apparel and fashion' },
                { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Essentials for your home' }
            ];

            const categoryMap = {};

            for (const catData of categories) {
                let cat = await Category.findOne({ slug: catData.slug });
                if (!cat) {
                    cat = new Category(catData);
                    await cat.save();
                    console.log(`Category created: ${cat.name}`);
                }
                categoryMap[cat.name] = cat._id;
            }

            // 4. Create Products
            const products = [
                {
                    title: 'Wireless Noise Cancelling Headphones',
                    slug: 'wireless-headphones',
                    description: 'Premium quality sound with active noise cancellation.',
                    category: categoryMap['Electronics'],
                    seller: seller._id,
                    basePrice: 299.99,
                    status: 'active',
                    images: ['https://placehold.co/600x400/222/fff?text=Headphones']
                },
                {
                    title: 'Smartphone X Pro',
                    slug: 'smartphone-x-pro',
                    description: 'Latest flagship smartphone with amazing camera.',
                    category: categoryMap['Electronics'],
                    seller: seller._id,
                    basePrice: 999.00,
                    status: 'active',
                    images: ['https://placehold.co/600x400/333/fff?text=Phone']
                },
                {
                    title: 'Men\'s Running Shoes',
                    slug: 'mens-running-shoes',
                    description: 'Lightweight and comfortable running shoes.',
                    category: categoryMap['Clothing'],
                    seller: seller._id,
                    basePrice: 89.50,
                    status: 'active',
                    images: ['https://placehold.co/600x400/444/fff?text=Shoes']
                },
                {
                    title: 'Automatic Coffee Maker',
                    slug: 'coffee-maker',
                    description: 'Start your morning with fresh coffee.',
                    category: categoryMap['Home & Kitchen'],
                    seller: seller._id,
                    basePrice: 120.00,
                    status: 'active',
                    images: ['https://placehold.co/600x400/555/fff?text=Coffee']
                }
            ];

            for (const prodData of products) {
                let prod = await Product.findOne({ slug: prodData.slug });
                if (!prod) {
                    prod = new Product(prodData);
                    await prod.save();
                    console.log(`Product created: ${prod.title}`);
                }
            }

            console.log('Product seeding completed');
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
