import { Router } from "express";
import SessionController from "../controllers/sessionsController";
import auth from "../middlewares/auth";

const sessionsRouter = Router();

sessionsRouter.post("/login", SessionController.login);
sessionsRouter.post("/signup", SessionController.signup);
sessionsRouter.get("/private", auth, SessionController.private);

export default sessionsRouter;
