const mongoose = require("mongoose");

const MONGO_DB_URI = process.env.MONGO_DB_SRV_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log("Se ha conectado a la base de datos");
    } catch (error) {
        console.log("connectDB - error", error);
        process.exit(1);
    }
};

module.exports = connectDB;