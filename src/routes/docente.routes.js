import Router from 'express';
const router = Router();

import * as DocenteCtrl from '../controllers/docente.controller';

router.post('/', createActividades)
export default router;