import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";
import { classToPlain } from 'class-transformer';

export class ListTagService {

  async execute() {
    const tagRepository = getCustomRepository(TagRepository);

    return classToPlain(await tagRepository.find());
  }
}
