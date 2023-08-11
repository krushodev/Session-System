import { Router } from "express";
import SessionController from "../controllers/sessionsController";

const sessionsRouter = Router();

sessionsRouter.post("/login", SessionController.login);
sessionsRouter.post("/signup", SessionController.signup);
/* sessionRouter.get("/private", SessionController.private); */

export default sessionsRouter;
