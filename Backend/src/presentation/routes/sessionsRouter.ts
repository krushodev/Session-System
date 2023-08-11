import { Router } from "express";
import SessionController from "../controllers/sessionsController";

const sessionRouter = Router();

sessionRouter.post("/login", SessionController.login);
sessionRouter.post("/signup", SessionController.signup);
/* sessionRouter.get("/private", SessionController.private); */

export default sessionRouter;
