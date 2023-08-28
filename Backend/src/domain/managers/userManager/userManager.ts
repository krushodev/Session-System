import container from "../../../container";

import IUserManager from "./userManagerInterface";
import IUserRepository from "../../../data/repositories/interfaces/userRepositoryInterface";

class UserManager implements IUserManager { 
    private userRespository: IUserRepository = container.resolve("UserRepository");

    public async list() {
        return await this.userRespository.list();
    }

    public async getOne(id: string) {
        return await this.userRespository.findOne(id);
    }

    public async create(data: { username: string, email: string, password: string }) { 
        return await this.userRespository.saveOne(data);
    }

    public async deleteOne(id: string) {
        return await this.userRespository.removeOne(id);
    }
}

export default UserManager;
