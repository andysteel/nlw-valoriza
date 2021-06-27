import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { classToPlain } from "class-transformer";

export class ListUserService {

  async execute() {
    const userRepository = getCustomRepository(UserRepository);

    return classToPlain(await userRepository.find());
  }
}
