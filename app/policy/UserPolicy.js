const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { auths } = require('../models/index'); 

module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Anda tidak memiliki akses" });
    } else {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err) {
                res.status(500).json({ msg: "Token Habis", err });
            } else {

            req.data = decoded;
            req.decoded = Object.keys(decoded)[0];
            console.log(Object.keys(decoded)[0]);
            next();
            }
        })
    }

};