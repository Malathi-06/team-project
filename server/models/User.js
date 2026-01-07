const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'seller', 'support'],
        default: 'customer'
    },
    profile: {
        phone: String,
        avatar: String,
        preferences: {
            newsletter: { type: Boolean, default: true },
            currency: { type: String, default: 'USD' }
        }
    },
    addresses: [{
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
        isDefault: { type: Boolean, default: false }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
