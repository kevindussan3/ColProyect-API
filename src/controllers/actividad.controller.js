import { mongo } from 'mongoose'
import Actividad from '../models/Actividad'
import Grado from '../models/Grado'
import Materia from '../models/Materia'

const uploadFile = require('../middlewares/upload')
const fs = require('fs')

export const createActivity = async(req, res) => {
    const directoryPath = __basedir + "../../resources/static/assets/uploads/";
    try {
        await uploadFile(req, res)

        const { numero_actividad, titulo, puntos, descripcion, urlArchivo, user, materia, grado } = req.body
        const { Grade, Matter } = req.params

        const newActivity = await Actividad({
            numero_actividad,
            titulo,
            puntos,
            descripcion,
            urlArchivo,
            materia,
            grado
        })

        if (Matter && Grade) {
            const foundMateria = await Materia.find({ nombre_materia: { $in: Matter } })
            newActivity.materia = foundMateria.map(materia => materia._id)
            const foundGrado = await Grado.find({ numero_grado: { $in: Grade } })
            newActivity.grado = foundGrado.map(grado => grado._id)
            console.log(foundGrado)
            console.log(foundMateria)
        } else {
            console.log("Prueba de salida " + Matter + Grade)
            res.status(400).json("Materia o Grado no existe");
        }
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



export const getActivity = async(req, res) => {
    const { Matter, Grade } = req.params

    console.log(Grade + "=================================" + Matter)
    const result = await Actividad.find({ "grado": mongo.ObjectId(Grade), "materia": mongo.ObjectId(Matter) })
    res.status(200).json(result)

}



export const downloadActivity = async(req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "../../resources/static/assets/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
}

export const deleteActivity = async(req, res) => {
    const result = await Actividad.findById(req.params.idActividad)
    await Actividad.findByIdAndDelete(req.params.idActividad)
    fs.unlink(result.urlArchivo, function(err) {
        if (err) throw err;
    });
    res.status(200).json("Eliminado")

}