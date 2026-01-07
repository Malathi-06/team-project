const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    action: {
        type: String,
        required: true
    },
    target: {
        model: String,
        id: mongoose.Schema.Types.ObjectId
    },
    details: mongoose.Schema.Types.Mixed,
    ipAddress: String,
    userAgent: String
}, {
    timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
