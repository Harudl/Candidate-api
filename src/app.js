const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const errorHandlerMidffleware = require("./middlewares/errorHandler")
const authRoutes = require("./routes/auth")
const candidateRoutes = require("./routes/candidate");
const jobRoutes = require("./routes/job");
const requestTimerMiddleware = require("./middlewares/requestTimer");
const passport = require("./middlewares/auth")
//const loggerMiddleware = require("./middlewar es/logger")

connectDB();
const app = express();

//CORS
app.use(cors());
app.use(helmet());
app.use(express.json());
//Logger HTTP
app.use(morgan("dev"));
//Medir el tiempo de respuesta
app.use(requestTimerMiddleware);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        status: 429,
        message: "Demasiadas peticiones"
    },
})
//app.use(limiter);
app.use(passport.initialize());

app.use("/api/v1/auth",authRoutes);


app.use("/api/v1/candidates", 
    passport.authenticate("jwt",{ session: false })
    ,candidateRoutes);
app.use("/api/v1/jobs",limiter,jobRoutes);

app.use(errorHandlerMidffleware);

module.exports = app;