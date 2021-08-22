import { Router } from "express";
import app from "../app";
const router = Router();
import * as userCtrl from '../controllers/user.controller';

router.post('/', userCtrl.perfil);
router.post('/editPerfil/:id', userCtrl.editPerfil);
router.post('/subirFoto/:idUser', userCtrl.fotoPerfil);


export default router;