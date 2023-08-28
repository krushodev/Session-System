import { Request, Response } from "express";

import SessionManager from "../../domain/managers/sessionManager/sessionManager";
import { generateAccessToken } from "../../shared";

class SessionController {
    public static async login(req: Request, res: Response) {
        try {
            const manager = new SessionManager();
            const user = await manager.login(req.body);
            const accessToken = generateAccessToken(user);
            res.status(200).send({ status: "success", message: "Te has logueado correctamente", payload: { accessToken, user: { ...user, password: undefined }} });
        } catch (err) {
            res.status(500).send({ status: "error", message: "Something went wrong" });
        }
    }

    public static async signup(req: Request, res: Response) {
        try {
            const manager = new SessionManager();
            await manager.signup(req.body);
            res.status(201).send({ status: "success", message: "Te has registrado correctamente" });    
        } catch (err) {
            res.status(500).send({ status: "error", message: "Something went wrong" });
        }
    }

    /* public static async private(req: Request, res: Response) {
        try {
            
        } catch (err) {
            res.status(500).send({ status: "error", message: "Something went wrong" });
        }
    } */
}

export default SessionController;
