import { createContainer, asClass, Lifetime } from "awilix";

import UserFileRepository from "./data/repositories/userFileRepository/userFileRepository";

const container = createContainer();

container.register("UserRepository", asClass(UserFileRepository).singleton());

export default container;
