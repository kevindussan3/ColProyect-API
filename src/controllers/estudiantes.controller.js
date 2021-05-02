// import Desarrollo from "../models/Desarrollo"
import Materia from "../models/Materia"
import Actividad from "../models/Actividad"
import Grado from "../models/Grado"
import User from "../models/User"
import { mongo } from 'mongoose'
import Desarrollo from "../models/Desarrollo";
import uploadFile from "../middlewares/upload";
import Role from "../models/Role";
const fs = require('fs');


export const uploadActivity = async (req, res) => {
    const fountActividad = await Actividad.find({'_id': mongo.ObjectId(req.params.idActividad)},{materia:1, _id:0})
    const matter = fountActividad.map(actividad => actividad.materia)
    fs.mkdir( `${__basedir}../../resources/static/assets/uploads/${req.params.idUser}/${matter}`, function (e) { if (!e || (e && e.code === 'EEXIST')) { } else { } });
    await uploadFile(req, res)
    const { titulo, descripcion, urlArchivo, materia, user, grado } = req.body
    const respuesta = await Desarrollo({
        titulo,
        descripcion,
        urlArchivo,

    })
    if (req.params.idUser && req.params.idActividad) {
        console.log("Estoy aquí")
        const foundActivity = await Actividad.find({ _id: { $in: req.params.idActividad } })
        respuesta.actividad = foundActivity.map(actividad => actividad._id)
        const foundUser = await User.find({ _id: { $in: req.params.idUser } })
        respuesta.user = foundUser.map(user => user._id)
    } else {
        console.log("Prueba de salida ")
        res.status(400).json("Materia o Grado no existe");
    }
    respuesta.urlArchivo = req.file.path
    
    respuesta.save()

    console.log(respuesta)
    res.json({message: "subido con exito"})
}


export const getActivitys = async (req, res) => {
    try {
        const result = await Desarrollo.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }


}
export const getActivityByIdUser = async (req, res) => {
    try {
        console.log(req.params.idUser + " Use")
        const result = await Desarrollo.find({ "user": mongo.ObjectId(req.params.idUser), "materia": mongo.ObjectId(req.params.idMatter) })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}



export const getMatters = async (req, res) => {
    const { idGrade, jornada } = req.params;
    const datos = await Materia.find({ grado: idGrade, jornada: jornada })
    res.json(datos)
}


export const getActivityMatters = async (req, res) => {
    const { idGrade, idMatter } = req.params;
    console.log(idGrade)
    console.log(idMatter)
    const foundActivity = await Actividad.find({ grado: mongo.ObjectId(idGrade), materia: mongo.ObjectId(idMatter) })
    console.log(foundActivity)
    res.status(200).json(foundActivity)
}



export const deleteActividadUpload = async (req, res) => {
    try {
        const result = await Desarrollo.findById(req.params.idDesarrollo)
        console.log(result)
        await Desarrollo.findByIdAndDelete(req.params.idDesarrollo)
        fs.unlink(result.urlArchivo, function (err) {
            if (err) throw err;
        });
        res.status(200).json("Eliminado")
    } catch (error) {
        res.status(400).json(error)

    }
}
