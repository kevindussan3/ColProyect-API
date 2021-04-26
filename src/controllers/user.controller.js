import User from "../models/User";


export const perfil = async(req, res) => {
    try {
        const infoUsuario = await User.find({email: req.body.email}).populate("roles");
        res.status(200).json(infoUsuario)
    } catch (error) {
        res.json(error)
    }
}
export const editPerfil = async(req, res) => {
    try {
        const editUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(editUser)
    } catch (error) {
        res.status(400).json("Ups, Algo paso")
    }
}

