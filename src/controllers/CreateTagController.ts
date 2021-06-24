import { Request, response, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController {

  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const createTagService = new CreateTagService();

    const tag = createTagService.execute(name);

    return response.json(tag);
  }
}

export default CreateTagController;
