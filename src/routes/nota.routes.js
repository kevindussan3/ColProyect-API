import { Router } from "express";
import app from "../app";
const router = Router();
import * as notaCtrl from '../controllers/nota.controller';

router.get('/nota', notaCtrl.crearNota);


export default router;