import { Schema, model } from "mongoose";

const gradoSchema = new Schema({
    numero_grado: {
        type: String,
        unique: true
    }, 
    materia: [{
        ref: "Materia",
        type: Schema.Types.ObjectId
    }],
},
{
    timestamps: true,
    versionKey: false,
}
);




export default model('Grado', gradoSchema);