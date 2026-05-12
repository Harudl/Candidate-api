const candidateModel = require("../models/candidate");


exports.getAll = async (req, res) => {
    const filter = { deleted: false };
    let result = await candidateModel.find(filter);
    const { status, name } = req.query;

    if (status) {
        result = result.filter(
            (candidate) => candidate.status.toLowerCase() === status.toLowerCase()
        );
    }

    if (name) {
        result = result.filter((candidate) =>
            candidate.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    res.json(result);
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    const filter = { deleted: false, _id: id }
    const candidate = await candidateModel.findOne(filter);

    if (!candidate) {
        res.status(404).json({ error: "Candidato no encontrado" });
    }

    res.status(200).json(candidate);
};


exports.create = async (req, res) => {
    const candidate = req.body;

    const newCandidate = await candidateModel.create(candidate);
    res.json({ status: 1, newCandidate });
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    const filter = { deleted: false, _id: id };

    const deleted = await candidateModel.findOneAndUpdate(
        filter,
        { deleted: true },
        { returnDocument: "after", runValidators: true }
    );
    if (deleted) {
        res.json({
            status: 1,
            deleted,
            message: "Candidato eliminado correctamente"
        });
    } else {
        res.status(404).json({ error: "Candidato no encontrado" });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const filter = { deleted: false, _id: id }
    const updatedCandidate = await candidateModel.findOneAndUpdate(
        filter,
        newData,
        {  returnDocument: "after", runValidators: true }
    );
    if (updatedCandidate) {
        res.json({ status: 1, updatedCandidate });
    } else {
        res.status(404).json({ error: "Candidato no encontrado" });
    }
};