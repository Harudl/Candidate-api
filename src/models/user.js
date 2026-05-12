
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password es obligatorio'],
        minlength: 6
    },
    deleted: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true },);

module.exports = mongoose.model("user",userSchema);
