import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

export class CreateComplimentController {

  async handle(req: Request, res: Response) {
    const createComplimentService = new CreateComplimentService();
    const {tag_id, user_sender, user_receiver, message } = req.body;

    const compliment = await createComplimentService.execute({tag_id, user_sender, user_receiver, message });

    res.json(compliment);
  }
}
