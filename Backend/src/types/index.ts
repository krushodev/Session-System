import { Request } from "express";

export interface RequestWithUser extends Request {
    user?: {
        id: string;
        username: string;
        email: string;
        password: undefined;
    }
}

export interface ResponseJWT{
    user: {
        id: string;
        username: string;
        email: string;
        password: undefined;
    }
}
