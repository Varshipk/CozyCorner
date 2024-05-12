import express from 'express';
import { deleteUser, test, userUpdate} from '../controllers/user.controller.js'
import { verifyTkn } from '../utils/authUser.js';


const router =express.Router();

router.get('/test',test)
router.post('/update/:id',verifyTkn,userUpdate);
router.delete('/delete/:id',verifyTkn,deleteUser)

export default router;