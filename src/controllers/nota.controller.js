// idMateria, idUsario, idActividad, nota
import Desarrollo from "../models/Desarrollo"
import { mongo } from 'mongoose'
export const verNotas = async (req, res) => {
    const foundDesarollos = await Desarrollo.find({ 'user': mongo.ObjectId(req.params.idUser) })
    let suma = 0;
    foundDesarollos.forEach((value) => {
        suma += value.nota
    })
    const result = suma / foundDesarollos.length
    
}