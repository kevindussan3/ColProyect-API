import Actividad from '../models/Actividad'
import Grado from '../models/Grado'
import Materia from '../models/Materia'

export const createActivity = async (req, res) => {
await uploadFile(req, res)
try {
  const {numero_actividad, titulo, puntos, descripcion, urlArchivo, grado, materia, user} = req.body
    
  const newActivity = await Actividad({ 
    numero_actividad,
    titulo,
    puntos,
    descripcion,
    urlArchivo: req.file.path,
    materia,
    grado
  })

   if(materia){

        const foundMateria = await Materia.find({nombre_materia: {$in: materia}})
        newActivity.materia = foundMateria.map(materia => materia._id)
    }else{
        const materia = await Materia.findOne({nombre_materia: 'Sociales'})
        newActivity.materia = [materia._id]
       

    }  
   if(req.params.grado){
        const foundGrado = await Grado.find({nombre_grado: {$in: grado}})
        newActivity.grado = foundGrado.map(grado => grado._id)
    }else{
        const grado = await Grado.findOne({nombre_grado: 'Sociales'})
        newActivity.grado = [grado._id]
       

    }  
  console.log(newActivity)
  
  if(req.file == undefined) {
    return res.status(400).send({message: "Por favor sube un archivo"})
  }
  
  res.status(200).send({
    
    message: "Archivo subido sastifactoriamente: " + req.file,
  });
  
    } catch (error) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file}. ${error}`,
          });
        
    }
    



}



const uploadFile = require('../middlewares/upload')
const fs = require('fs')
export const getActivity = async (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
  
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: req.baseUrl + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });  
   
   
}