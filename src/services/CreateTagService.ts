import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";

export class CreateTagService {

  async execute(name: string) {
    const tagRepository = getCustomRepository(TagRepository);

    if(!name) {
      throw new Error('Incorrect name !');
    }

    const tag = await tagRepository.findOne({ name });

    if(tag) {
      throw new Error('Tag Already exists');
    }

    const createdTag = tagRepository.create({
      name
    })

    await tagRepository.save(createdTag);

    return createdTag;
  }
}
