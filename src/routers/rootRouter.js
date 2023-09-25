import express from "express";
import { home, search, setting } from "../controllers/videoController";
import { getJoin, postJoin, login } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search", search);
rootRouter.get("/setting", setting);

export default rootRouter;
