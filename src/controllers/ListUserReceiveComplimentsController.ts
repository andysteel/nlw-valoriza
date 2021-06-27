import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

export class ListUserReceiveComplimentsController {

  async handle(req: Request, res: Response) {
    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();
    const { user_id } = req;

    const listReceivedCompliments =  await listUserReceiveComplimentsService.execute(user_id);

    return res.json({
      listReceivedCompliments
    });
  }
}
