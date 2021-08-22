import { Schema, model } from "mongoose";

const actividadSchema = new Schema({
    titulo: {
        type: String,
    },
    descripcion: {
        type: String
    },
    puntos: {
        type: Number
    },
    urlArchivo: {
        type: String
    },
    name: {type:String},
    materia: [{
        ref: "Materia",
        type: Schema.Types.ObjectId
    }],
    user: [{
        ref: "User",
        type: Schema.Types.ObjectId
    }],
    grado: [{
        ref: "Grado",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false,
});




export default model('Actividad', actividadSchema);