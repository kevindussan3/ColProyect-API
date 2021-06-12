const util = require('util')
const multer = require('multer');
const fs = require('fs');
const maxSize = 2 * 1024 * 1024;
import {mongo} from 'mongoose'
import Actividad from '../models/Actividad'
import Materia from '../models/Materia'


let storage = multer.diskStorage({
    destination:async (req, file, cb) => {
        if (req.params.idUser && req.params.idActividad) {
            const fountActividad = await Actividad.find({ '_id': mongo.ObjectId(req.params.idActividad) }, { materia: 1, _id: 0 })
            const matter = fountActividad.map(actividad => actividad.materia)
            cb(null, __basedir + `../../resources/static/assets/uploads/${req.params.idUser}/${matter}/`);
        } else if(req.params.Grade && req.params.Matter) {
            console.log(req.params.Grade + ' Matter' + req.params.Matter)
            cb(null, __basedir + `../../resources/static/assets/uploads/${req.params.Grade}/${req.params.Matter}/`);
        }

    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, file.originalname);
    },
});


let uploadFile = multer({

    storage: storage,
    limits: { fileSize: maxSize }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware