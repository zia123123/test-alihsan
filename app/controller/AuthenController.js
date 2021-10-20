const { auths } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const apiResponse = require("../helpers/apiResponse");

module.exports = {
    
    signUp(req, res) {
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        auths.create({
            username: req.body.username,
            password: password,
            nama: req.body.nama,
            alamat: req.body.alamat,
            nama_puskesmas: req.body.nama_puskesmas,
        }).then(auths => {
            let token = jwt.sign({ auth: auths }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            res.json({
                auth : auths,
                token: token,
            });
        }).catch(err => {
            return apiResponse.ErrorResponse(res, err);
        });
    },

    async getAll(req, res) {
        let result = await auths.findAll({
            attributes: ['id','nama', 'alamat','nama_puskesmas']
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    signIn(req, res) {
        let { username, password } = req.body;
        auths.findOne({
            where: {
                username: username
            },
        }).then(auths => {
            if (!auths) {
                res.status(404).json({ message: "Maaf Akun tidak di temukan" });
            } else {
                if (bcrypt.compareSync(password, auths.password)) {
                    let token = jwt.sign({ auths: auths }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                     
                    res.json({
                        status: 200,
                        message:"SUCCESS",
                        data: auths,
                        token: token
                    })
                } else {
                    res.status(401).json({ msg: "Password Salah" })
                }
            }
        }     
        ).catch(err => {
            return apiResponse.ErrorResponse(res, err);
        })     
    },

}