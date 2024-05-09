import express from 'express';
import {test, userUpdate} from '../controllers/user.controller.js'
import { verifyTkn } from '../utils/authUser.js';


const router =express.Router();

router.get('/test',test)
router.post('/update/:id',verifyTkn,userUpdate);

export default router;