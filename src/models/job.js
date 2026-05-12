const mongoose = require("mongoose");


const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El titulo de la vacante es obligatorio']
    },
    company: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio']
    },
    salary: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open"
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true },);

module.exports = mongoose.model("jobs",jobSchema);