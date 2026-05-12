
const mongoose = require("mongoose");


const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: 20,
        minlength: 4
    },
    lastname: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: 20,
        minlength: 4
    },
    email: {
        type: String,
        unique: [true, "No se permite una segunda aplicacion"],
        required: true
    },
    position: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "In Review", "Interview", "Hiring"],
    },
    appliedAt: {
        type:Date,
        default: Date.now()
    },
    deleted: {
        type: Boolean,
        default: false
    },
    skills:{
        type: [String],
        default: []
    },
    linkedIn:{
        type: String,
        required:true
    }

}, { timestamps: true },);

module.exports = mongoose.model("candidates",candidateSchema);

/*
const candidates = [
    {
        id: 1,
        name: "Ada Lovelace",
        email: "ada@example.com",
        status: "Pending",
        position: "Backend DEveloper",
        appliedAt: "2026-04-10"
    },
    {
        id: 2,
        name: "Alan Turning",
        email: "alan@example.com",
        status: "Pending",
        position: "Machine Learning Engineer",
        appliedAt: "2026-04-12"
    },
    {
        id: 3,
        name: "Grace Hopper",
        email: "grace@example.com",
        status: "Hired",
        position: "Software Architect",
        appliedAt: "2026-04-15"
    },

];

exports.findAll = () => candidates;

exports.findById = (id) =>
    candidates.find((candidate) => candidate.id === Number(id));

//POST

exports.createCandidate = (candidate) => {

    const newCandidate = {
        ...candidate,
        id: candidates.length + 1,
        appliedAt: new Date().toISOString(),
    }
    candidates.push(newCandidate);
    return newCandidate;
}

//DELETE
exports.deleteByIdCandidate = (id) => {
    const index = candidates.findIndex((c) => c.id === Number(id));

    if (index !== -1) {
        candidates.splice(index, 1);
        return true;
    }
    return false;
}

exports.updateCandidate = (id, data) => {
    const index = candidates.findIndex((c) => c.id === Number(id));
    if (index !== -1) {
        candidates[index] = { ...candidates[index], ...data };
        return candidates[index];
    }
    return null;

}*/