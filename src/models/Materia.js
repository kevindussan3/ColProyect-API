import { Schema, model } from "mongoose";



const materiaSchema = new Schema({
    nombre_materia: {
        type: String,
        unique: true
    }, 
    nota: {
        type: String,
        
    }, 
},
{
    timestamps: true,
    versionKey: false,
}
);




export default model('Materia', materiaSchema);