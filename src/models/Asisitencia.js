import { Schema, model } from "mongoose";

const actividadSchema = new Schema({
    justificacion: {
        type: String,
    },
    urlArchivo: {
        type: String
    },
    asistio: {
        type: Boolean,
    },
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