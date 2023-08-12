import User from "../../entities/user";

interface ISessionManager {
    login: (data: { email: string, password: string }) => Promise<User>;
    signup: (data: { name: string, email: string, password: string }) =>  Promise<boolean>;
}

export default ISessionManager;
