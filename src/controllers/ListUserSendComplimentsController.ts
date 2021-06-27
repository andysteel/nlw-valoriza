import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";

export class ListUserSendComplimentsController {

  async handle(req: Request, res: Response) {

    const listUserSendComplimentsService = new ListUserSendComplimentsService();
    const { user_id } = req;

    const listSendCompliments =  await listUserSendComplimentsService.execute(user_id);

    return res.json({
      listSendCompliments
    });
  }
}
