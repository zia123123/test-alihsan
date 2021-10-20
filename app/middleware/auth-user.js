const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { users } = require('../models/index'); 

module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Anda tidak memiliki akses" });
    } else {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err) {
                res.status(500).json({ msg: "Token Habis", err });
            } else {
                users.findByPk(decoded.user.id).then(user => {
                    req.users = auditors;
                    next();
                }).catch(err => {
                    res.status(500).json({
                        msg: "Sever Error"
                });
            });
            }
        })
    }

};