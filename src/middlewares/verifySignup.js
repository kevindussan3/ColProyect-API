import Materia from '../models/Materia';
import {ROLES} from '../models/Role';
import User from "../models/User";


export const checkDuplicateIdentificationAndEmail = async (req, res, next) => {
    const identificacion = await User.findOne({identificacion: req.body.identificacion});
    if(identificacion) return res.status(400).json({message: 'Ups, ya existe'});
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: 'Ups, ya existe'})
    next()
}


export const checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} no existe`
                })
            }
        }
    }
    next()
}


// Validar que las materias agregadas ya existan 
export const checkMateriaExisted = async (req, res, next) => {
    const foundMateria = await Materia.find({},{"nombre_materia":1, "_id":0})
    const result = foundMateria.map((materia) => {
       const result = materia.nombre_materia
       return result
    });
    if(req.body.materia) {
        for (let i = 0; i < req.body.materia.length; i++){
            if(!result.includes(req.body.materia[i])){
                return res.status(400).json({
                    message: `Materia ${req.body.materia[i]} no existe`
                })
            }
        }
    }
    next()
}