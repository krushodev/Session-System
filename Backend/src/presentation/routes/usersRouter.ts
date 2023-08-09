import { Router } from "express";

import UserController from "../controllers/usersController";

const usersRouter = Router();

usersRouter.get("/", UserController.getAll);
usersRouter.get("/:uid", UserController.getOne);
usersRouter.post("/", UserController.createOne);
usersRouter.delete("/:uid", UserController.deleteOne);

export default usersRouter;
