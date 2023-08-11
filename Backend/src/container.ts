import { createContainer, asClass } from "awilix";

import UserFileRepository from "./data/repositories/userFileRepository";

const container = createContainer();

container.register("UserRepository", asClass(UserFileRepository).singleton());

export default container;
