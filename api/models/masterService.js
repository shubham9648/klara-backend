const mongoose = require('mongoose');
Schema = mongoose.Schema;


const masterServiceSchema = Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    currency: {
        type: String
    },
    addedBy: {
        type: Schema.ObjectId
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("masterservices", masterServiceSchema);