import { Router } from "express";
const router = Router();
import * as ActividadCtrl from "../controllers/actividad.controller";

router.get('/:Grade&:Matter', ActividadCtrl.getActivity);
router.post('/:Grade&:Matter', ActividadCtrl.createActivity);
router.delete('/:idActividad', ActividadCtrl.deleteActivity);
router.post('/download/', ActividadCtrl.downloadActivity);
router.get('/', ActividadCtrl.getActivity);


export default router