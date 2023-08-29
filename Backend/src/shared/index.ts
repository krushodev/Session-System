import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../domain/entities/user";

dotenv.config();

export const generateHash = async (password: string) => await bcrypt.hash(password, 10);

export const validateHash = async (password: string, hash: string) => await bcrypt.compare(password, hash);

export const generateAccessToken = (user: User) => {
    return jwt.sign({ user: {...user, password: undefined } }, process.env.JWT_ACCESS_KEY!, { expiresIn: "1m" });
}

export const generateRefreshToken = (user: User) => {
    return jwt.sign({ user: { id: user.id } }, process.env.JWT_REFRESH_KEY!, { expiresIn: "20s" });
}
