import fs from "fs/promises";
import { resolve } from "path";
import { randomUUID } from "crypto";

/* interface UserFileRepositoryInterface {
    list: () => void;
    findOne: (id: string) => void;
    saveOne: (data: object) => void;
    deleteOne: (id: string) => void;
} */

class UserFileRepository /* implements UserFileRepositoryInterface */ {
    private path = resolve("src/data/files/users.json");

    async list() {
        const users = await fs.readFile(this.path, "utf-8");

        if (!users) await fs.writeFile(this.path, '[]');

        return users ? JSON.parse(users) : [];
    }  

    async findOne(id: string) {
        const users = await this.list();

        const user = users.find((user: { id: string }) => user.id === id);

        return user;
    }

    async saveOne(data: object) {
        const users = await this.list();

        users.push({...data, id: randomUUID()});

        await fs.writeFile(this.path, JSON.stringify(users, null, 2));

        return users;
    }

    async removeOne(id: string) {
        const users = await this.list();

        const filter = users.filter((user: { id: string }) => user.id !== id);

        await fs.writeFile(this.path, JSON.stringify(filter, null, 2));

        return true;
    }
}

export default UserFileRepository;
