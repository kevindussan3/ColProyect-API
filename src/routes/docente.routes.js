import {Router} from 'express';
const router = Router();






import * as DocenteCtrl from '../controllers/docente.controller';

router.post('/asistencia', DocenteCtrl.asistencia);
router.get('/obternerActividad/:idActividad', DocenteCtrl.getActivityById)
router.get('/obtenerActividades/:idUser&:idGrade', DocenteCtrl.getActivityIdUserIdGrade);
router.get('/respuestas/:idRespuestas', DocenteCtrl.getAllActivityUploads)
router.post('/calificar/:idMatter&:idDesarrollo', DocenteCtrl.calificarActivity)
router.get('/cursos/', DocenteCtrl.getCursos)
router.get('/estudiantes/:idGrado', DocenteCtrl.getStudents);
// router.post('/', DocenteCtrl.createActivity)
// router.get('/', DocenteCtrl.getActivity)
// router.get('/', DocenteCtrl.deleteActivity)
// router.get('/', DocenteCtrl.downloadActivity)

export default router;