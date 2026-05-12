const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const userModel = require("../models/user");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, deleted: false });
    if (!user) {
        return res.status(401).send({ message: "Invalid Credentials" })
    }
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
     return res.status(401).send({ message: "Invalid Credentials"})
    }

    const token = jwt.sign({id: user._id, email: user.email},JWT_SECRET,
        {expiresIn: "15m",}
    );
   res.send({
    token, id: user._id
   });
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const exist = await userModel.findOne({ email, deleted: false });
    if (exist) {
        return res.status(409).send({ message: "Email already exist" })
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ email, password: hash });
    return res.send({ message: "Usuario Creado", id: user._id });

};