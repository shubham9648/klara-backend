const mongoose = require('mongoose');
Schema = mongoose.Schema;
const { user } = require('../../constants/userRoles');

const profileSchema = Schema({
    username: {
        type: String
    },
    fullName: {
        type: String
    },
    dob: {
        type: Date
    },
    employeeId: {
        type: String
    }
});

const addressSchema = Schema({
    country: {
        type: String
    },
    city: {
        type: String
    }, 
    state: {
        type: String
    },
    pincode: {
        type: String
    }
});

const userSchema = Schema({
    userID: {
        type: Number
    },
    ID: {
        type: String
    },
    phone: {
        work: {
            type: String
        },
        mobile: {
            type: String
        }
    },
    countryCode: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    profile: profileSchema,
    address: addressSchema,
    active: {
        type: Boolean,
        default: true
    },
    online: {
        type: Boolean,
        default: false
    },
    isNewsLetter: {
        type: Boolean,
        default: false
    },
    isAggrement: {
        type: Boolean,
        default: false
    },
    isInformation: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [{
            type: String,
            enum: Object.values(user.roles),
        }],
        default: [],
    },
    addedBy: {
        type: Schema.ObjectId
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("users", userSchema);