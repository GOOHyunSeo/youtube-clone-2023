import express from "express";
import {
  seeProfile,
  logout,
  deleteUser,
  startGoogleLogin,
  finishGoogleLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/google/start", publicOnlyMiddleware, startGoogleLogin);
userRouter.get("/google/finish", publicOnlyMiddleware, finishGoogleLogin);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/delete", protectorMiddleware, deleteUser);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/:id", seeProfile);

export default userRouter;
