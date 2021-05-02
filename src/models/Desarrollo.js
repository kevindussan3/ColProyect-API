import { Schema, model } from "mongoose";

const desarrolloSchema = new Schema({
    titulo: {
        type: String,
    },
    descripcion: {
        type: String
    },
    urlArchivo: {
        type: String
    },
    nota: {type: Number},
    respuesta: {type: String},
    actividad: [{
        ref: "Actividad",
        type: Schema.Types.ObjectId
    }],
    user: [{
        ref: "User",
        type: Schema.Types.ObjectId
    }],
}, {
    timestamps: true,
    versionKey: false,
});



export default model('Desarrollo', desarrolloSchema);