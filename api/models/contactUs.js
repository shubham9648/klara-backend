const mongoose = require('mongoose');
Schema = mongoose.Schema;


const contactSchema = Schema({
    name: {
        type: String
    },
    message: {
        type: String
    },
    email: {
        type: String
    },
    addedBy: {
        type: Schema.ObjectId
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("contactus", contactSchema);