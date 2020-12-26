import {Schema, model } from "mongoose";

export const ROLES = [ "admin", "estudiante","docente", "acudiente" ]

const roleSchema = new Schema({
    name: String
},
{
    versionKey: false
}
);

export default model("Role", roleSchema);