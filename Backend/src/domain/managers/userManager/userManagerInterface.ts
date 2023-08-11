import User from "../../entities/user";

interface IUserManager {
    list: () => Promise<User[]>;
    getOne: (id: string) => Promise<User | undefined>;
    create: (data: { name: string, email: string, password: string }) => Promise<User | undefined>;
    deleteOne: (id: string) => Promise<boolean>;
}

export default IUserManager;
