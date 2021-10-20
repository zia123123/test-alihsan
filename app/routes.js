const express = require('express');
const router = express.Router();
// Middlewares

//
// Middlewares
const userplolicy = require('./policy/UserPolicy');



// Controllers
const AuthController = require('./controller/AuthenController');


const multer = require('multer')
const multerConf = {
    storage: multer.diskStorage({
        destination : function(req,file, next){
            next(null,'./app/public/images')
        },
        filename: function(req, file, next){
            const ext = file.mimetype.split('/')[1]
            next(null, file.fieldname+ '-' +Date.now()+ '.' +ext)
        }
    }),
    Filefilter: function(req,file,next){
        if(!file){
            next()
        }
        const image = file.mimetype.startsWidth('images/')
        if(image){
            next(null,true)
        }else{
            next({
                message: "File Not Supported"
            }, false)
        }
    }
};





// Home
router.get('/', (req, res) => res.json({ hello: "World" }));




//count
router.post('/api/alihsan/register', AuthController.signUp);
router.post('/api/alihsan/login', AuthController.signIn);
router.get('/api/alihsan/',userplolicy, AuthController.getAll);



module.exports = router;

