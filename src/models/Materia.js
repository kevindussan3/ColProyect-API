import { Schema, model } from "mongoose";



const materiaSchema = new Schema({
    nombre_materia: {
        type: String
    },
    grado: [{
        ref: "Grado",
        type: Schema.Types.ObjectId
    }],
    user: [{
        ref: "User",
        type: Schema.Types.ObjectId
    }],
    jornada: {type: String}

}, {
    timestamps: true,
    versionKey: false,
});




export default model('Materia', materiaSchema);