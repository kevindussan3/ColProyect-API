// idMateria, idUsario, idActividad, nota

import { Schema, model } from "mongoose";

const definitivaSchema = new Schema({
    user: [{
        ref: "User",
        type: Schema.Types.ObjectId
    }],
    materia: {type:String},
    definitiva: {type: Number},
    periodo: {type:String}
}, {
    timestamps: true,
    versionKey: false,
});




export default model('Definitiva', definitivaSchema);