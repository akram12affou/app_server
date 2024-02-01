import path from "path";
import userModel from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import HttpError from '../models/errorModel.js'
import { fileNameG } from '../utils/fileNamegenerator.js'
import { __filename , __dirname } from '../utils/pathHelper.js'



export const register = asyncHandler(async (req,res, next) => {

    const {username,email,password} = req.body;
    const {avatar} = req.files;

    const usernameExists = await userModel.findOne({
      username, 
    });
    const emailExists = await userModel.findOne({
      email : email.toLowerCase() 
    });
    if(usernameExists){
      return next(new HttpError('username already exists',403));
    };
    if(emailExists){
      return next(new HttpError('email already exists',403));
    };
   
  
    const avatarFileName = fileNameG(avatar)
    avatar.mv(path.join(__dirname, "..", "uploads", avatarFileName), async (err) => {
      if(err) {
        return next(new HttpError(err.message , 500));
      }
    });

    const user = await userModel.create({
      username, 
      email, 
      password,
      avatar :avatarFileName 
  });

    const token = await user.getJWTToken()
    res.json({
      user ,
      token
    });
   
})


export const login = asyncHandler(async (req,res,next) => {
   const {email,password} = req.body;
   
   const user = await userModel.findOne({
    email 
  });

   if(!user){
    return next(new HttpError('user doesnt exist',401));
   }

   const isPassowrdCorrect = await user.comparePassword(password);
 

   if(isPassowrdCorrect) {

    const token = await user.getJWTToken()

    res.json({
      user , token
    })

   } else {

    return next(new HttpError('uncorrect password',401));

   }

});

export const updateUserInfo = asyncHandler(async (req,res,next) => {
    res.json(req.user)
})