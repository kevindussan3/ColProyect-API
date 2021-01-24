import { Router } from "express";
const router = Router()
import {authJwt, verifySignup} from '../middlewares'
import * as adminCtrl from "../controllers/admin.controller";



// CRUD GRADE
router.post('/createGrade', adminCtrl.createGrade)
router.delete('/deleteGradeId/:GradeId', adminCtrl.deleteGradeId)
router.put('/updateGradeId/:GradeId', adminCtrl.updateGradeId)
router.get('/getGradeId/:GradeId', adminCtrl.getGradeId)
router.get('/getGrade/', adminCtrl.getGrade)

// CRUD MATTERS
router.post('/createMatter', adminCtrl.createMatter)
router.delete('/deleteMatterId/:matterId', adminCtrl.deleteMatterId)
router.put('/updateMatterId/:matterId', adminCtrl.updateMatterId)
router.get('/getMatterId/:matterId', adminCtrl.getMatterId)
router.get('/getMatter/', adminCtrl.getMatter)

// CRUD USERS
router.post('/',  adminCtrl.createUser);
router.get('/', adminCtrl.getUsers);
router.get('/:userId', adminCtrl.getUserById);
router.put('/:userId', adminCtrl.updateUserById);
router.delete('/:userId', adminCtrl.deleteUserById);
export default router;