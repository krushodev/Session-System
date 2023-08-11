interface ISessionManager {
    login: (data: { email: string, password: string }) => Promise<boolean>;
    signup: (data: { name: string, email: string, password: string }) =>  Promise<boolean>;
}

export default ISessionManager;
