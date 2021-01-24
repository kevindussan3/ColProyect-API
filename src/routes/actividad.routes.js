import { Router } from "express";
const router = Router();
import * as ActividadCtrl from "../controllers/actividad.controller";

router.get('/:Grade&:Matter', ActividadCtrl.getActivity);
router.post('/:Grade&:Matter', ActividadCtrl.createActivity);
router.delete('/:idActividad', ActividadCtrl.deleteActivity);
router.get('/:name', ActividadCtrl.downloadActivity);
router.get('/', ActividadCtrl.getActivity);


export default router