import User from "../models/User";
import Role from '../models/Role';



export const createUser = async(req, res) => {
    const {identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password, roles} = req.body;
    const newUser = new User({identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password, roles});
    const userSaved = await newUser.save()
    res.status(201).json(userSaved);
}

export const getUsers = async(req, res) => {
    const infoUsuario = await User.find().populate("roles");
    res.status(200).json(infoUsuario)
} 

export const getUserById  = async (req, res) => {
    const user = await User.findById(req.params.userId).populate("roles");
    console.log(user)
    res.status(200).json(user);  
}

export const updateUserById =  async (req, res) => {
 
const { identificacion,
    email,
    nombres,
    apellidos,
    telefono,
    rh,
    fechaNacimiento,
    direccion,
    password,
    roles} = req.body;
    

    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        const r = foundRoles.map(role => role._id)
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            identificacion,
            email,
            nombres,
            apellidos,
            telefono,
            rh,
            fechaNacimiento,
            direccion,
            password: await User.encryptPassword(password),
            roles:r
        },  {new: true} ).populate("roles");
        res.status(200).json(updateUser);
    }else{
        const role = await Role.findOne({name: 'estudiante'})
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
            password: await User.encryptPassword(password),
            roles:r
        },  {new: true} ).populate("roles");
        res.status(200).json(updateUser);

    }  
}
export const deleteUserById = async (req, res) => {
    const {userId} = req.params
    await User.findByIdAndDelete(userId)
    res.status(204).json()
    
}

export const deleteProductById = async (req, res) => {
    const {productId} = req.params
    await Product.findByIdAndDelete(productId)
    res.status(204).json()
}