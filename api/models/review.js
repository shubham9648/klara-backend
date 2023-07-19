const mongoose = require('mongoose');
Schema = mongoose.Schema;


const reviewSchema = Schema({
    notificationId: {
        type: Schema.ObjectId,
    },
    ratings: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    feedBackService: {
        type: String
    },
    additionalComment: {
        type: String
    },
    addedBy: {
        type: Schema.ObjectId
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("reviews", reviewSchema);