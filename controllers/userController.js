const bcrypt = require("bcrypt");
const User = require("../database/models/user.model");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {

    try {
        const { username, email, password, passwordnd } = req.body;
        if(password!==passwordnd|| !username || !email){
            if(password!==passwordnd) return res.status(409).send({error: "Passwords do not match."});
            else return res.status(409).send({error:"All fields required."});
        }
        const data = {
            username,
            email,
            password: await bcrypt.hash(password, 10),
        };

        const user = await User.create(data);

        if (user) {
            let token = jwt.sign({ id: user.id, username: username }, process.env.secretKey, {
                expiresIn: '24h',
            });

            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);

            return res.status(201).send({id: user.id, token: token, username: username});
        } else {
            return res.status(409).send({error: "Details are not correct"});
        }
    } catch (error) {
        console.log(error);
    }
};



const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: {
                username: username
            }
        });

        if (user) {
            const isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                let token = jwt.sign({ id: user.id,  username: username }, process.env.secretKey, {
                    expiresIn: '24h',
                });

                return res.status(201).send({id:user.id, token: token, username: username});
            } else {
                return res.status(401).send({error: "The password you’ve entered is incorrect."});
            }
        } else {
            return res.status(401).send({error: "The username you’ve entered doesn't exist."})
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup,
    login,
};