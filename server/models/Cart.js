const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        variantId: String, // SKU or specific variant ID from Product.variants
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: { // Snapshot of price at time of adding
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
