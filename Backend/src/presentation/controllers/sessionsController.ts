import { NextFunction, Request, Response } from "express";

import SessionManager from "../../domain/managers/sessionManager/sessionManager";

import { RequestWithUser } from "../../types";

class SessionController {
    public static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const manager = new SessionManager();
            const { accessToken, refreshToken } = await manager.login(req.body);
            res.status(200).send({ status: "success", message: "Te has logueado correctamente", payload: { accessToken, refreshToken } });
        } catch (err) {
            next(err);
        }
    }

    public static async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const manager = new SessionManager();
            await manager.signup(req.body);
            res.status(201).send({ status: "success", message: "Te has registrado correctamente" });    
        } catch (err) {
            next(err);
        }
    }

    public static async private(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            res.status(200).send({ status: "success", payload: user });
        } catch (err) {
            next(err);
        }
    }

    public static async provideRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
            const manager = new SessionManager();
            const accessToken = await manager.resolveRefreshToken(refreshToken);   
            res.status(200).send({ status: "success", message: "Has renovado tu refresh token", payload: { accessToken }})          
        } catch (err) {
            next(err);
        }
    }
}

export default SessionController;
