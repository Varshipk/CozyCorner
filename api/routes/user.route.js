import express from 'express';
import { deleteUser, showListings, test, userUpdate} from '../controllers/user.controller.js'
import { verifyTkn } from '../utils/authUser.js';


const router =express.Router();

router.get('/test',test)
router.post('/update/:id',verifyTkn,userUpdate);
router.delete('/delete/:id',verifyTkn,deleteUser);
router.get('/listings/:id',verifyTkn,showListings)

export default router;