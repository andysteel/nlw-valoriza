import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";


export class ListUserReceiveComplimentsService {

  async execute(user_id: string) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      where: {
        user_receiver: user_id
      },
      // exemplo de fetch Eager
      //relations: ["userSender", "userReceiver", "tag"]
    })

    return compliments;
  }
}
