import User from "../../../domain/managers/entities/user";

interface IUserFileRepository {
    list: () => Promise<User[]>;
    findOne: (id: string) => Promise<User | undefined>;
    saveOne: (data: { name: string, email: string, password: string }) => Promise<User | undefined>;
    removeOne: (id: string) => Promise<boolean>;
}

export default IUserFileRepository;