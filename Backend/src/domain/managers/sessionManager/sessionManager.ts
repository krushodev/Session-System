import jwt from "jsonwebtoken";

import container from "../../../container";

import IUserRepository from "../../../data/repositories/interfaces/userRepositoryInterface";
import ISessionManager from "./sessionManagerInterface";
import { ResponseJWT } from "../../../types";

import { generateAccessToken, generateHash, generateRefreshToken, validateHash } from "../../../shared";

class SessionManager implements ISessionManager {
    private userRepository: IUserRepository = container.resolve("UserRepository"); 

    public async login(data: { email: string, password: string }) {
        const user = await this.userRepository.findOneByEmail(data.email);

        if (!user) throw new Error("Incorrect user or password");
       
        const passwordValidation = await validateHash(data.password, user.password);

        if (!passwordValidation) throw new Error("Incorrect user or password");

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return { accessToken, refreshToken};
    }

    public async signup(data: { username: string, email: string, password: string } ) {
        const userExists = await this.userRepository.findOneByEmail(data.email);

        if (userExists) throw new Error("User already exists");

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

        if (!user) throw new Error("Incorrect user");

        const newAccessToken = generateAccessToken(user);

        return newAccessToken;
    }
}

export default SessionManager;
