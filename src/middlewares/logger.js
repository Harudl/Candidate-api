const logger = (req, _res, next) => {
    console.log("req.method",req.method);
    console.log("req.ur",req.url);
    console.log("req.ip",req.ip);

    next();

}

module.exports = logger;