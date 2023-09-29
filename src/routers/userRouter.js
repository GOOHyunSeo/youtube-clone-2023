import express from "express";
import {
  seeProfile,
  logout,
  edit,
  deleteUser,
  startGoogleLogin,
  finishGoogleLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/google/start", startGoogleLogin);
userRouter.get("/google/finish", finishGoogleLogin);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id", seeProfile);

export default userRouter;
