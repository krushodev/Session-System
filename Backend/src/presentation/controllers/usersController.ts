import { Request, Response } from "express";
import UserManager from "../../domain/managers/userManager/userManager";

class UserController {
    public static async getAll(req: Request, res: Response) {
        try {
            const manager = new UserManager();
            const result = await manager.list();
            res.status(200).send({ status: "success", data: result });
        } catch (err) {
            res.status(500).send({ status: "error", message: "Something went wrong" });
        }
    }

    public static async getOne(req: Request, res: Response) {
        try {
            const { uid } = req.params;
            const manager = new UserManager();
            const result = await manager.getOne(uid);
            res.status(200).send({ status: "success", data: result });
        } catch (err) {
            res.status(500).send({ status: "error", message: "Something went wrong" });
        }
    }

    public static async createOne(req: Request, res: Response) {
        try {
            const manager = new UserManager();
            const result = await manager.create(req.body);
            res.status(200).send({ status: "success", data: result });
        } catch (err) {
            res.status(500).send({ status: "error", message: "Something went wrong" });
        }
    }

    public static async deleteOne(req: Request, res: Response) {
        try {
            const { uid } = req.params;
            const manager = new UserManager();
            const result = await manager.deleteOne(uid);
            res.status(200).send({ status: "success", data: result });
        } catch (err) {
            res.status(500).send({ status: "error", message: "Something went wrong" });
        }
    }
}

export default UserController;
