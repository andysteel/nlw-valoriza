import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

interface CreateComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class CreateComplimentService {

  async execute({ tag_id, user_sender, user_receiver, message }: CreateComplimentRequest) {

    const complimentRepository = getCustomRepository(ComplimentRepository);

    if(user_sender === user_receiver) {
      throw new Error('Incorrect user receiver');
    }

    const userReceiver = await complimentRepository.findOne(user_receiver);

    if(userReceiver) {
      throw new Error('User receiver does not exists');
    }

    const compliment = complimentRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    await complimentRepository.save(compliment);

    return compliment;
  }
}
