import fs from "fs/promises";
import { resolve } from "path";
import { randomUUID } from "crypto";

import IUserRepository from "./interfaces/userRepositoryInterface";
import User from "../../domain/entities/user";

class UserFileRepository implements IUserRepository {
    private path = resolve("src/data/files/users.json");

    public async list() {
        const users: Promise<User[]> = JSON.parse( await fs.readFile(this.path, "utf-8" ));

        if (!users) await fs.writeFile(this.path, '[]');

        return users;
    }  

    public async findOne(id: string) {
        const users = await this.list();

        const user = users.find((user) => user.id === id);

        return user;
    }

    public async findOneByEmail(email: string) {
        const users = await this.list();

        const user = users.find((user) => user.email === email);

        return user;
    }

    public async saveOne(data: { name: string, email: string, password: string }) {
        const users = await this.list();

        const newUser: User = { ...data, id: randomUUID() };

        users.push(newUser);

        await fs.writeFile(this.path, JSON.stringify(users, null, 2));

        return newUser;
    }

    public async removeOne(id: string) {
        const users = await this.list();

        const filter = users.filter((user) => user.id !== id);

        await fs.writeFile(this.path, JSON.stringify(filter, null, 2));

        return true;
    }
}

export default UserFileRepository;
