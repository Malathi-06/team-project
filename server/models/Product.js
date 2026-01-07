const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        min: 0
    },
    images: [String],
    attributes: [{
        name: String,
        value: String
    }],
    variants: [{
        sku: String,
        attributes: Map, // e.g., { "size": "M", "color": "Red" }
        price: Number,
        stock: {
            type: Number,
            default: 0
        },
        images: [String]
    }],
    ratings: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0 }
    },
    tags: [String],
    status: {
        type: String,
        enum: ['draft', 'active', 'archived'],
        default: 'draft'
    }
}, {
    timestamps: true
});

// Index for search
productSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
