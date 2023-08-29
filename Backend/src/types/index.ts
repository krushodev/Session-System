import { Request } from "express";

interface UserBody {
    id: string;
    username: string;
    email: string;
    password: undefined;
}

export interface RequestWithUser extends Request {
    user?: UserBody
}

export interface ResponseJWT{
    user: UserBody
}
