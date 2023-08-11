import container from "../../../container";

import IUserRepository from "../../../data/repositories/interfaces/userRepositoryInterface";
import ISessionManager from "./sessionManagerInterface";

class SessionManager implements ISessionManager {
    private userRepository: IUserRepository = container.resolve("UserRepository"); 

    public async login(data: { email: string, password: string }) {
        const user = await this.userRepository.findOneByEmail(data.email);

        if (!user) throw new Error("User not found");
        else if (user.password !== data.password) throw new Error("Incorrect password");

        return true;
    }

    public async signup(data: { name: string, email: string, password: string } ) {
        await this.userRepository.saveOne(data);

        return false;
    }
}

export default SessionManager;
