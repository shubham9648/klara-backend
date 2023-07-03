const mongoose = require('mongoose');
Schema = mongoose.Schema;


const orderSchema = Schema({
    userId: {
        type: Schema.ObjectId
    },
    date: {
        type: Date
    },
    notes: {
        type: String
    },
    service: {
        type: [{
            type: Schema.ObjectId
        }]
    },
    address: {
        type: String
    },
    houseArea: {
        type: Number
    },
    havePet: {
        type: Boolean
    },
    petName: {
        type: [{
            type: String
        }]
    },
    donateToEmployee: {
        type: Boolean
    },
    donatedAmount: {
        type: Number
    },
    addedBy: {
        type: Schema.ObjectId
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("orders", orderSchema);