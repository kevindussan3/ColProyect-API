import { Schema, model } from "mongoose";

const gradoSchema = new Schema({
    numero_grado: {
        type: String,
    },
    jornada: {type: String}
}, {
    timestamps: true,
    versionKey: false,
});




export default model('Grado', gradoSchema);