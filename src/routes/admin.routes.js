import { Router } from "express";
const router = Router()

import * as adminCtrl from "../controllers/admin.controller";

router.post('/', adminCtrl.createUser);
router.get('/', adminCtrl.getUsers);
router.get('/:userId', adminCtrl.getUserById);
router.put('/:userId', adminCtrl.updateUserById);
router.delete('/:userId', adminCtrl.deleteUserById);


export default router;