import { Schema, model } from "mongoose";

const gradoSchema = new Schema({
    numero_grado: {
        type: String,
        unique: true
    },
    jornada: {type: String}
}, {
    timestamps: true,
    versionKey: false,
});




export default model('Grado', gradoSchema);