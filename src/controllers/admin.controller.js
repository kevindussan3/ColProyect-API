import User from "../models/User";
import Role from '../models/Role';
import Grado from '../models/Grado';
import Materia from "../models/Materia";
import mongo from 'mongoose';

// CRUD PARA USUARIOS

export const createUser = async (req, res) => {
    try {
        const { identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password, roles, grado, jornada } = req.body;
        const newUser = new User({ identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password: await User.encryptPassword(password), roles, grado, jornada });
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ name: "estudiante" })
            newUser.roles = [role._id]
        }
        const userSaved = await newUser.save()
        res.status(201).json(userSaved);
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getUsers = async (req, res) => {
    try {
        const infoUsuario = await User.find().populate("roles");
        res.status(200).json(infoUsuario)
    } catch (error) {
        res.status(400).json(error)
    }

}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("roles");
        console.log(user)
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error)
    }

}

export const updateUserById = async (req, res) => {
    const {
        identificacion,
        email,
        nombres,
        apellidos,
        telefono,
        rh,
        fechaNacimiento,
        direccion,
        roles,
        grado,
        jornada
    } = req.body;
    console.log(req.params.userId)
    console.log(req.body)

    if (roles) {
        console.log(roles)
        const foundRoles = await Role.find({ name: { $in: roles } })
        console.log(foundRoles)
        const r = foundRoles.map(role => role._id)
        console.log(r)
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            identificacion,
            email,
            nombres,
            apellidos,
            telefono,
            rh,
            fechaNacimiento,
            direccion,
            roles: r,
            grado, jornada
        }, { new: true, useFindAndModify: false }).catch((e) => { console.log(e) })

        res.status(200).json(updateUser);
    } else {
        const role = await Role.findOne({ name: 'estudiante' })
        const r = [role._id]
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            identificacion,
            email,
            nombres,
            apellidos,
            telefono,
            rh,
            fechaNacimiento,
            direccion,
            roles: r,
            grado, jornada
        }, { new: true, useFindAndModify: false })
        res.status(200).json(updateUser);
    }
}
export const deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params
        await User.findByIdAndDelete(userId)
        res.status(204).json()

    } catch (error) {
        res.status(400).json(error)
    }

}



// CRUD Materias
export const createMatter = async (req, res, next) => {
    const { nombre_materia, profesor, grados, jornada } = req.body
    const newMatter = await Materia({ nombre_materia, jornada })
    const foundDocente = await User.find({ _id: { $in: profesor } }).catch((e) => { res.status(400).json({ message: "No existe docente" }) })
    const foundgrade = await Grado.find({ numero_grado: { $in: grados }, jornada: jornada }).catch((e) => { res.status(400).json({ message: "No existe docente" }) })
    newMatter.user = foundDocente.map(item => item._id)
    newMatter.grado = foundgrade.map(item => item._id)
    const result = await newMatter.save()
    res.json(result)
}



export const getMatter = async (req, res) => {
    try {
        const getMatter = await Materia.find()
        res.status(200).json(getMatter);
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getMatterId = async (req, res) => {
    try {
        const metter = await Materia.findById(req.params.matterId);
        console.log(metter)
        res.status(200).json(metter);
    } catch (error) {
        res.status(400).json(error)
    }

}

export const updateMatterId = async (req, res) => {
    try {
        const metter = await Materia.findByIdAndUpdate(req.params.matterId, req.body, { new: true });
        res.status(200).json(metter)
    } catch (error) {
        res.status(400).json(error)
    }

}

export const deleteMatterId = async (req, res) => {
    try {
        await Materia.findByIdAndDelete(req.params.matterId);
        res.status(200).json("Eliminado")
    } catch (error) {
        res.status(400).json(error)
    }

}



// CRUD crear grado

export const createGrade = async (req, res) => {
    try {
        var dato;
        var jorn;
        const { numero_grado, jornada } = req.body;
        const foundGrade = await Grado.find({ numero_grado: { $in: numero_grado } })
        foundGrade.map((value) => {
        dato = value.numero_grado
        jorn = value.jornada})
        if (dato == numero_grado && jorn == jornada) return res.status(400).json({message: "Grado y jornada ya existe"});
        const newGrado = new Grado({ numero_grado, jornada })
        console.log(newGrado)
        const result = await newGrado.save();
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }

}


export const getGrade = async (req, res) => {
    try {
        const foundGrade = await Grado.find()
        res.status(200).json(foundGrade)
    } catch (error) {
        res.status(400).json(error)
    }


}


export const deleteGradeId = async (req, res) => {
    try {
        const foundDeleteGrade = await Grado.findByIdAndDelete(req.params.GradeId)
        res.status(400).json("Eliminado")
    } catch (error) {
        res.status(400).json(error)
    }

}

export const updateGradeId = async (req, res) => {
    try {
        const { numero_grado, jornada } = req.body;
        const foundGrade = await Grado.findById(req.params.GradeId);
        console.log(foundGrade)
        
        // if (materia) {
        //     const grado = new Grado({ numero_grado, materia });
        //     const foundMateria = await Materia.find({ nombre_materia: { $in: materia } })
        //     const metter = foundMateria.map(materia => materia._id)
        //     console.log(metter, req.body)
        //     const updateGrade = await Grado.findByIdAndUpdate(req.params.GradeId, {
        //         numero_grado,
        //         materia: metter
        //     }, { new: true });
        //     res.status(200).json(updateGrade);
        // } else {
        //     const grado = new Grado({ numero_grado, materia });
        //     const materia = await Materia.findOne({ nombre_materia: 'Sociales' })
        //     const matter = [materia._id]
        //     const updateGrade = await Grado.findByIdAndUpdate(req.params.GradeId, {
        //         numero_grado,
        //         materia: matter
        //     }, { new: true });
        //     res.status(200).json(updateGrade);
        // }
    } catch (error) {
        res.status(400).json(error)
    }

}


export const getGradeId = async (req, res) => {
    try {
        const foundGradeId = await Grado.findById(req.params.GradeId);
        res.status(200).json(foundGradeId);
    } catch (error) {
        res.status(400).json(error)
    }
}



// Obtener solo los usuarios con el tipo de rol que se envia
export const getAllTipoRol = async (req, res) => {
    const docente = await Role.find({ 'name': req.params.rol })
    const idRol = docente.map(value => value._id)
    console.log(idRol)
    const docentes = await User.find({ 'roles': idRol })
    res.json(docentes)
}