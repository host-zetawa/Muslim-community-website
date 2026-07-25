const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    dateOfJoining: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Member", memberSchema);