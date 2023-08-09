import container from "../../container";

class UserManager { 
    private respository = container.resolve("UserRepository");

    async list() {
        return await this.respository.list();
    }

    async getOne(id: string) {
        return await this.respository.findOne(id);
    }

    async create(data: object) {
        return await this.respository.saveOne(data);
    }

    async deleteOne(id: string) {
        return await this.respository.removeOne(id);
    }
}

export default UserManager;
