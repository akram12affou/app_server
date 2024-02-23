import express from "express";
import { authGuard } from "../middlewares/authMiddleware.js";
import {
  register,
  login,
  updateUserInfo,
  updateUserAvatar,
  RemoveUserAvatar,
  getUserDetails,
  deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/updateUserInfo", authGuard, updateUserInfo);
router.put("/updateUserAvatar", authGuard, updateUserAvatar);
router.put("/removeUserAvatar", authGuard, RemoveUserAvatar);
router.get("/getUserDetails", authGuard, getUserDetails);
router.delete("/deleteUser", authGuard, deleteUser);

export default router;