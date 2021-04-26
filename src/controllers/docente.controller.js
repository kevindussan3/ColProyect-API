import Docente from '../models/Docente';




export const createActivity  = async (req, res) => {
  
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


export const deleteActivity = async (req, res) => {}
export const updateActivity = async (req, res) => {}