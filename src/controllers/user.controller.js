import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";


export const perfil = async(req, res) => {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(403).json({message: "No Token"})
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        const user = await User.findById(req.userId, {password: 0}).populate("roles")
        res.status(200).json(user)
}
export const editPerfil = async(req, res) => {
    try {
        const editUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(editUser)
    } catch (error) {
        res.status(400).json("Ups, Algo paso")
    }
}



