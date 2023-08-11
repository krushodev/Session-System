import { Request, Response } from "express";

import SessionManager from "../../domain/managers/sessionManager/sessionManager";

class SessionController {
    public static async login(req: Request, res: Response) {
        try {
            const manager = new SessionManager();
            await manager.login(req.body);
            res.status(200).send({ status: "success", message: "Te has logueado correctamente" });
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
