import express from 'express'
import { authGuard } from '../middlewares/authMiddleware.js'
import {register , login , updateUserInfo , updateUserAvatar } from '../controllers/userControllers.js'

const router = express.Router()
 

router.post('/register' , register);
router.post('/login' , login);
router.put('/updateUserInfo' , authGuard , updateUserInfo);
router.put('/updateUserAvatar' , authGuard , updateUserAvatar);

export default router;
 