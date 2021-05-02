import Docente from '../models/Docente';
import * as CtrlActividad from './actividad.controller'


import { mongo } from "mongoose"
import Actividad from "../models/Actividad"
import Desarrollo from "../models/Desarrollo"



export const createActivity = async (req, res) => {

}

export const downloadActivity = async (req, res) => {
  try {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  } catch (error) {
    res.status(400).json(errors)
  }

}

export const getAllActivityUploads = async (req, res) => {
  const foundActividad = await Desarrollo.find({ 'actividad': mongo.ObjectId(req.params.idRespuestas) })
  res.status(200).json(foundActividad)
}

export const getActivityById = async (req, res) => {
  const { idActividad } = req.params
  const foundActividad = await Actividad.find({ '_id': mongo.ObjectId(idActividad) })
  console.log(foundActividad)
  res.status(200).json(foundActividad)
}

export const deleteActivity = async (req, res) => { }
export const updateActivity = async (req, res) => { }

export const calificarActivity = async (req, res) => {
  const { nota, respuesta } = req.body
  const updateDesarrollo = await Desarrollo.findByIdAndUpdate(req.params.idDesarrollo, {
    nota,
    respuesta
  }, { new: true, useFindAndModify: false })
  res.status(200).json(updateDesarrollo);

}