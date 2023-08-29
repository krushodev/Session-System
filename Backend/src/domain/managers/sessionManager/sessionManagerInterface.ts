import User from "../../entities/user";

interface ISessionManager {
    login: (data: { email: string, password: string }) => Promise<{ accessToken: string, refreshToken: string }>;
    signup: (data: { username: string, email: string, password: string }) =>  Promise<boolean>;
    resolveRefreshToken: (data: string) => Promise<string>;
}

export default ISessionManager;
