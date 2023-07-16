const mongoose = require('mongoose');
Schema = mongoose.Schema;


const notificationSchema = Schema({
    refrenceId: {
        type: Schema.ObjectId
    },
    status: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending"
    },
    orderId: {
        type: Schema.ObjectId
    },
    active: {
        type: Boolean,
        default: true
    },
    addedBy: {
        type: Schema.ObjectId
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("notifications", notificationSchema);