
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
const Validator = require('fastest-validator');
require('dotenv').config();
const v = new Validator();

function signUp(req, res) {
    const validationResponse = validateEmailAndPassowrd(req.body);
    console.log(validationResponse);
    if (validationResponse === true) {
        models.User.findOne({ where: { email: req.body.email } }).then(result => {
            if (result) {
                return res.status(409).json({
                    status: 409,
                    message: "Email already exist"
                });
            }
            else {
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(req.body.password, salt, function (err, hash) {
                        const user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        };
                        models.User.create(user).then(result => {
                            res.status(201).json({
                                status: 201,
                                message: "Signed up successfully",
                                post: result,
                            });
                        }
                        ).catch(error => {
                            res.status(500).json({
                                message: "Server Error",
                                error: error,
                            });
                        });
                    });
                });
            }


        });
    }
    else {
        res.status(400).json({
            message: "Server Error",
            error: validationResponse,
        });
    }
}
function login(req, res) {
    const validationResponse = validateEmailAndPassowrd(req.body);
    console.log(validationResponse);
    if (validationResponse === true) {
        models.User.findOne({ where: { email: req.body.email } }).then(user => {
            if (user === null) {
                return res.status(401).json({
                    status: 401,
                    message: "Invalid credentials!"
                });
            }
            else {
                bcryptjs.compare(req.body.password, user.password, function (err, result) {
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user.id,

                        },process.env.JWT_KEY, function (error, token) {
                            res.status(200).json({
                                status: 200,
                                message: "Auth successfully",
                                token: token,
                            });
                        }
                        );
                    }
                    else {
                        return res.status(401).json({
                            status: 401,
                            message: "Invalid password!"
                        });
                    }
                });
            }


        });
    }
    else {
        res.status(400).json({
            message: "Server Error",
            error: validationResponse,
        });
    }
}
function validateEmailAndPassowrd(user) {
    const emailSchema = {
        email: { type: "email", label: "Email Address" },
        password: { type: "string", min: 6 },

    };
    const check = v.compile(emailSchema);
    return check(user);



}
module.exports = { signUp: signUp, login: login };