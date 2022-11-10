const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    From: {
        type: String,
        required: true
    },
    To: {
        type: String,
        required: true
    },
    add: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    }
});

const users = new mongoose.model("users",userSchema);


module.exports = users;