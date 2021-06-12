import { Router } from "express";
import app from "../app";
const router = Router();
import * as notaCtrl from '../controllers/nota.controller';

router.get('/ver/:idUser', notaCtrl.verNotas);


export default router;