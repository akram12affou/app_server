import express from 'express'
import { authGuard } from '../middlewares/authMiddleware.js'
import {register , login , updateUserInfo } from '../controllers/userControllers.js'

const router = express.Router()
 

router.post('/register' , register);
router.post('/login' , login);
router.put('/update-user' , authGuard , updateUserInfo);

export default router;
 