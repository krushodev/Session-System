import User from "../../../domain/entities/user";

interface IUserRepository {
    list: () => Promise<User[]>;
    findOne: (id: string) => Promise<User | undefined>;
    findOneByEmail: (email: string) => Promise<User | undefined>;
    saveOne: (data: { username: string, email: string, password: string }) => Promise<User | undefined>;
    removeOne: (id: string) => Promise<boolean>;
}

export default IUserRepository;