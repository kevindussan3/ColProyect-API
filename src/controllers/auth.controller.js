import Role from "../models/Role";
import Grado from "../models/Grado";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

const { SECRET } = config;

export const signup = async (req, res) => {

    try {
        const { identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password, roles, grado, jornada } = req.body;
        const hashedPassword = await User.encryptPassword(password)
        const newUser = new User({
            identificacion,
            email,
            nombres,
            apellidos,
            telefono,
            password: hashedPassword,
            jornada
        });
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ name: "estudiante" })
            newUser.roles = [role._id]
        }
        if (grado) {
            const foundGrado = await Grado.find({ numero_grado: grado, jornada: jornada })
            newUser.grado = foundGrado.map(role => role._id);
        }
        console.log(newUser)
        const savedUser = await newUser.save()
        console.log(savedUser);
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400,
        })
        res.status(200).json({ token })
    } catch (error) {
        res.status(400).json({ error: "Error during signup" });
    }


}
// export const signin = async (req, res) => {
//     try {
//         const userFound = await User.findOne({ email: req.body.email }).populate("roles")
//         const identificacionUser = await User.findOne({ identificacion: req.body.identificacion }).populate("roles")
//         if (req.body.email) {
//             if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
//             const macthPassword = await User.comparePassword(req.body.password, userFound.password)
//             if (!macthPassword) return res.status(401).json({ token: null, message: "Contraseña invalida" });
//             const token = jwt.sign({ id: userFound._id }, config.SECRET, {
//                 expiresIn: 86400
//             })
//             res.json({ token })
//         } else if (req.body.identificacion) {
//             if (!identificacionUser) return res.status(400).json({ message: "Usuario no encontrado" });
//             const macthPassword = await User.comparePassword(req.body.password, identificacionUser.password);
//             if (!macthPassword) return res.status(401).json({ token: null, message: "Contraseña invalida" });
//             const token = jwt.sign({ id: identificacionUser._id }, config.SECRET, {
//                 expiresIn: 86400
//             })
//             res.json({ token })
//         }
//     } catch (error) {
//         res.status(400).json(error)
//     }

// }

export const signin = async (req, res) => {
    try {
        const { email, identificacion, password } = req.body;

        if (!email && !identificacion) {
            return res.status(400).json({ message: "Debes proporcionar un correo o identificación" });
        }

        const userFound = email
            ? await User.findOne({ email }).populate("roles")
            : await User.findOne({ identificacion }).populate("roles");

        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const matchPassword = await User.comparePassword(password, userFound.password);

        if (!matchPassword) {
            return res.status(401).json({ token: null, message: "Credenciales incorrectas. Verifica tu nombre de usuario y contraseña.", error_code: "INVALID_CREDENTIALS" });
        }

        const token = jwt.sign({ id: userFound._id }, SECRET, {
            expiresIn: 86400
        });



        res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            data: {
                user: userFound,
                token: token
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
