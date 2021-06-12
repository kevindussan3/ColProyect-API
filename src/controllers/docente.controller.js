import Docente from '../models/Docente';
import * as CtrlActividad from './actividad.controller'


import { mongo } from "mongoose"
import Actividad from "../models/Actividad"
import Desarrollo from "../models/Desarrollo"
import Nota from "../models/Nota"
import Materia from "../models/Materia"
import Definitiva from "../models/Definitiva"



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
  const idUser = await Desarrollo.find({ '_id': req.params.idDesarrollo }, { _id: 0, user: 1 })
  const updateDesarrollo = await Desarrollo.findByIdAndUpdate(req.params.idDesarrollo, {
    nota,
    respuesta
  }, { new: true, useFindAndModify: false })
  const id = idUser.map(value => value.user)
  const foundDesarollos = await Desarrollo.find({ 'user': mongo.ObjectId(id[0][0]) })
  console.log(foundDesarollos)
  const idMateria = foundDesarollos.map(desarrollo => desarrollo.materia)
  let suma = 0;
  foundDesarollos.forEach((value) => {
    suma += value.nota
  })
  const result = suma / foundDesarollos.length
  const foundDefinitiva = await Definitiva.find({ 'user': mongo.ObjectId(id[0][0]), 'materia': mongo.ObjectId(req.params.idMatter) })
  const a = foundDefinitiva.map(value => value.user)
  console.log("data 1 " + a[0])
  console.log("data 2 " + id)
  if (a[0] == id+"") {
    // definitiva = result
    const updateDesarrollo = await Definitiva.findByIdAndUpdate(a, {}, { new: true, useFindAndModify: false })
  } else {
    console.log('Aqui 2')
    const newNota = new Definitiva({ periodo: "1"})
    newNota.user =    idUser.map(value => value.user)
    newNota.definitiva = result
    newNota.materia = req.params.idMatter
    newNota.save()
  }
  // if (foundDefinitiva == null) {
  //   console.log('Aqui 1')
  // } else {
  //   console.log('Aqui 2')
    // const newNota = new Definitiva({ periodo: "1"})
    // newNota.user =    idUser.map(value => value.user)
    // newNota.definitiva = result
    // newNota.materia = req.params.idMatter
    // newNota.save()
    // console.log(newNota)
  // }
  console.log(foundDefinitiva)

  res.status(200).json(updateDesarrollo);

}