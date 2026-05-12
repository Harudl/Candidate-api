const job = require("../models/job");
const jobModel = require("../models/job");

exports.getAll = async (req, res) => {

    const { status, title } = req.query;
    const filter = { deleted: false };

    if (status) filter.status = status;
    if (title) filter.title = { $regex: title, $options: "i" };

    const jobs = await jobModel.find(filter);
    res.json(jobs);
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    const job = await jobModel.findOne({
        _id: id, deleted: false
    })

    if (!job) {
        return res.status(404).json({
            error: "Oferta no encontrada"
        })
    }
    res.json(job);
};

exports.create = async (req, res) => {
    const job = req.body;

    const newjob = await jobModel.create(job);

    res.json({
        status: 1,
        newjob
    })
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const filter = { _id: id, deleted: false };
    const updateJob = await jobModel.findOneAndUpdate(
        filter,
        newData,
        { returnDocument: "after", runValidators: true }
    )

    if (updateJob) {
        res.json({
            status: 1,
            updateJob
        })
    } else {
        res.status(401).json({ error: "Oferta no encontrada" })
    }

};

exports.delete = async (req, res) => {
    const { id } = req.params;
    const filter = { _id: id, deleted: false }
    const deletedJob = await jobModel.findOneAndUpdate(
        filter,
        { deleted: true },
        { returnDocument: "after", runValidators: true }
    );

    if (deletedJob) {
        res.json({
            status: 1,
            deletedJob,
            message: "Oferta eliminado correctamente"
        });
    } else {
        res.status(404).json({ error: "Candidato no encontrado" });
    }
};