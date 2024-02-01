import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import HttpError from '../models/errorModel.js';
import asyncHandler from 'express-async-handler'
export const authGuard = asyncHandler(async (req,res,next) => {
    const token = req.headers.authorization;
    if(!token){
        return next(new HttpError('user not logged in',403)); 
    }else{
        const isValidUser = await jwt.verify(token,process.env.JWT_SECRET)
           req.user = await userModel.findById(isValidUser.id);
           next() 
        }
})