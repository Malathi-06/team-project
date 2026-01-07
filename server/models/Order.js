const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        title: String,
        quantity: Number,
        price: Number,
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller'
        }
    }],
    totalAmount: { type: Number, required: true },
    shippingAmount: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    tracking: {
        carrier: String,
        number: String,
        history: [{
            status: String,
            timestamp: { type: Date, default: Date.now },
            location: String
        }]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
