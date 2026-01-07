const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    storeName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: String,
    logo: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'suspended'],
        default: 'pending'
    },
    businessDetails: {
        taxId: String,
        address: {
            street: String,
            city: String,
            state: String,
            zip: String,
            country: String
        }
    },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Seller', sellerSchema);
