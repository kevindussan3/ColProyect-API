import { Router } from "express";
const router = Router();
import * as ActividadCtrl from "../controllers/actividad.controller";

router.post('/:grado&:materia', ActividadCtrl.createActivity );
router.get('/', ActividadCtrl.getActivity );


export default router
