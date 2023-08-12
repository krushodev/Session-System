import container from "../../../container";

import IUserRepository from "../../../data/repositories/interfaces/userRepositoryInterface";
import { generateHash, validateHash } from "../../../shared";
import ISessionManager from "./sessionManagerInterface";

class SessionManager implements ISessionManager {
    private userRepository: IUserRepository = container.resolve("UserRepository"); 

    public async login(data: { email: string, password: string }) {
        const user = await this.userRepository.findOneByEmail(data.email);

        if (!user) throw new Error("User not found");
       
        const passwordValidation = await validateHash(data.password, user.password);

        if (!passwordValidation) throw new Error("Incorrect password");

        return user;
    }

    public async signup(data: { name: string, email: string, password: string } ) {
        const hashedPassword = await generateHash(data.password);

        await this.userRepository.saveOne({...data, password: hashedPassword});

        return false;
    }
}

export default SessionManager;
