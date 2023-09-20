import express from "express";
import {
  seeProfile,
  logout,
  edit,
  deleteUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id(\\d+)", seeProfile);

export default userRouter;
