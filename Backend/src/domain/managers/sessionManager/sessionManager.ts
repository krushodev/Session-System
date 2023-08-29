import jwt from "jsonwebtoken";

import container from "../../../container";

import IUserRepository from "../../../data/repositories/interfaces/userRepositoryInterface";
import { generateAccessToken, generateHash, generateRefreshToken, validateHash } from "../../../shared";
import ISessionManager from "./sessionManagerInterface";

import { ResponseJWT } from "../../../types";

class SessionManager implements ISessionManager {
    private userRepository: IUserRepository = container.resolve("UserRepository"); 

    public async login(data: { email: string, password: string }) {
        const user = await this.userRepository.findOneByEmail(data.email);

        if (!user) throw new Error("User not found");
       
        const passwordValidation = await validateHash(data.password, user.password);

        if (!passwordValidation) throw new Error("Incorrect password");

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return { accessToken, refreshToken};
    }

    public async signup(data: { username: string, email: string, password: string } ) {
        const hashedPassword = await generateHash(data.password);

        await this.userRepository.saveOne({...data, password: hashedPassword});

        return false;
    }

    public async resolveRefreshToken(data: string) {
        let userId = "";

        jwt.verify(data!, process.env.JWT_REFRESH_KEY!, (err, credentials) => {
            if (err) throw new Error("Token has expired");
            
            userId = (credentials as ResponseJWT).user.id;
        });

        const user = await this.userRepository.findOne(userId);

        if (!user) throw new Error("User not found");

        const newAccessToken = generateAccessToken(user);

        return newAccessToken;
    }
}

export default SessionManager;
