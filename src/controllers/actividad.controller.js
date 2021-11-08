import { mongo } from 'mongoose'
import Actividad from '../models/Actividad'
import Grado from '../models/Grado'
import Materia from '../models/Materia'
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";


const uploadFile = require('../middlewares/upload')
const getJornada = require('../middlewares/authJwt')
const fs = require('fs')

export const createActivity = async (req, res) => {    
    try {
        const {Matter, Grade} = req.params
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({ message: "No Token" })
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        const user = await User.findById(req.userId, { password: 0 }).populate("roles")
        await fs.promises.mkdir(`${__basedir}../../resources/static/assets/uploads/${user.jornada}/${req.params.Matter}/${req.params.Grade}`, { recursive: true }, function (e) { if (!e || (e && e.code === 'EEXIST')) { } else { } });
        await uploadFile(req, res)
        const { numero_actividad, titulo, puntos, descripcion, urlArchivo, materia, name } = req.body
        const newActivity = await Actividad({
            numero_actividad,
            titulo,
            puntos,
            descripcion,
            urlArchivo,
            materia,
            name,
            user: user._id
        })
        // newActivity.materia = req.params.Matter
        newActivity.grado = req.params.Grade;
        // if (Matter && Grade) {
            const foundMateria = await Materia.find({ nombre_materia: req.params.Matter, jornada: user.jornada })
            newActivity.materia = foundMateria.map(materia => materia._id)
        //     const foundGrado = await Grado.find({ numero_grado: Grade, jornada: user.jornada })
        //     newActivity.grado = foundGrado.map(grado => grado._id)
        // } else {
        //     console.log("Prueba de salida " + Matter + Grade)
        //     res.status(400).json("Materia o Grado no existe");
        // }
        if (req.file == undefined) {
            return res.status(400).send({ message: "Por favor sube un archivo" })
        }
        newActivity.urlArchivo = req.file.path
        res.status(200).send({
            message: "Archivo subido sastifactoriamente: " + req.file,
        });
        newActivity.save()
        console.log(newActivity)

    } catch (error) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file}. ${error}`,
        });
    }
}



export const getActivity = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({ message: "No Token" })
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        const user = await User.findById(req.userId, { password: 0 }).populate("roles")
        const { Matter, Grade } = req.params
        const response = await Materia.find({ nombre_materia: Matter, jornada: user.jornada})
        let matteria;
        const result = await Actividad.find({ "grado": mongo.ObjectId(Grade), "materia": response.map((value) => matteria = value._id)})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}



export const downloadActivity = async (req, res) => {
    // const fileName = req.params.name;
    const {name, urlDownload } = req.body
    // const directoryPath = __basedir + "../../resources/static/assets/uploads/";
    // console.log(fileName)
    console.log(req.body)
    // console.log(req.body.urlDownload)
    res.download(urlDownload, name, (err) => {
        if(err){
            res.status(500).send({
                message: "No se pudo descargar"
            });
        }
    });
    // res.download(directoryPath + fileName, fileName, (err) => {
    //         if (err) {
    //                 res.status(500).send({
    //                         message: "Could not download the file. " + err,
    //                     });
    //         }
    //     });
    //     try {
    // } catch (error) {
    //     res.status(400).json(error)
    // }
    
}

export const deleteActivity = async (req, res) => {
    try {
        const result = await Actividad.findById(req.params.idActividad)
        await Actividad.findByIdAndDelete(req.params.idActividad)
        fs.unlink(result.urlArchivo, function (err) {
            if (err) throw err;
        });
        res.status(200).json("Eliminado")
    } catch (error) {
        res.status(400).json(error)

    }


}