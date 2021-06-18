import {Router} from 'express';
const router = Router();






import * as DocenteCtrl from '../controllers/docente.controller';

router.get('/obternerActividad/:idActividad', DocenteCtrl.getActivityById)
router.get('/respuestas/:idRespuestas', DocenteCtrl.getAllActivityUploads)
router.post('/calificar/:idMatter&:idDesarrollo', DocenteCtrl.calificarActivity)
router.get('/cursos/', DocenteCtrl.getCursos)

// router.post('/', DocenteCtrl.createActivity)
// router.get('/', DocenteCtrl.getActivity)
// router.get('/', DocenteCtrl.deleteActivity)
// router.get('/', DocenteCtrl.downloadActivity)

export default router;