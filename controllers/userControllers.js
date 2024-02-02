import path from "path";
import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import HttpError from "../models/errorModel.js";
import { fileNameG } from "../utils/fileNamegenerator.js";
import { __filename, __dirname } from "../utils/pathHelper.js";
import { removeFile } from "../utils/removeFile.js";

//============= Register User
//POST:user/register
//UNPROTECTED 
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const { avatar } = req.files || "";

  const usernameExists = await userModel.findOne({
    username,
  });
  const emailExists = await userModel.findOne({
    email: email.toLowerCase(),
  });
  if (usernameExists) {
    return next(new HttpError("username already exists", 403));
  }
  if (emailExists) {
    return next(new HttpError("email already exists", 403));
  }

  let avatarFileName;

  if (avatar) {
    avatarFileName = fileNameG(avatar);
    avatar.mv(
      path.join(__dirname, "..", "uploads", avatarFileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err.message, 500));
        }
      }
    );
  }

  const user = await userModel.create({
    username,
    email,
    password,
    avatar: avatarFileName || "",
  });

  const token = await user.getJWTToken();
  res.json({
    user,
    token,
  });
});




//=============Login User
//POST:user/login
//UNPROTECTED 
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return next(new HttpError("user doesnt exist", 401));
  }

  const isPassowrdCorrect = await user.comparePassword(password);

  if (isPassowrdCorrect) {
    const token = await user.getJWTToken();

    res.json({
      user,
      token,
    });
  } else {
    return next(new HttpError("uncorrect password", 401));
  }
});



//============= Update User Info
//PUT:user/updateUserInfo
//PROTECTED  
export const updateUserInfo = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOneAndUpdate(
    req.user._id,
    {
      username,
      email,
      password,
    },
    { new: true, runValidators: true }
  );

  res.json(user);
});

//=============Update user avatar
//PUT:user/updateUserAvatar
//PROTECTED  
export const updateUserAvatar = asyncHandler(async (req, res, next) => {
  const { avatar } = req.files;

  const avatarFileName = fileNameG(avatar);

  req.user.avatar !== "" && removeFile(req.user.avatar);
  avatar.mv(
    path.join(__dirname, "..", "uploads", avatarFileName),
    async (err) => {
      if (err) {
        return next(new HttpError(err.message, 500));
      }
    }
  );

  const user = await userModel.findOneAndUpdate(
    req.user._id,
    {
      avatar: avatarFileName,
    },
    { new: true }
  );

  res.json(user);
});
