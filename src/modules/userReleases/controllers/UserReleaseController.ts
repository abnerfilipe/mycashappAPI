import { Request, Response } from "express";
import ListUserReleaseService from "../services/ListUserReleaseService";
import ShowUserReleaseService from "../services/ShowProductService";

export default class UserReleaseController{
  public async list(request: Request, response: Response): Promise<Response> {
    const list = new ListUserReleaseService();
    const data = await list.execute();
    return response.status(200).json(data);
  }
  public async listAllFromTransaction(request: Request, response: Response): Promise<Response> {
    const { id , date } = request.params;
    const list = new ListUserReleaseService();
    const data = await list.executeAllFromTransactionId(id, date);
    return response.status(200).json(data);
  }
  public async listAllFromUser(request: Request, response: Response): Promise<Response> {
    const { id , date } = request.params;
    const list = new ListUserReleaseService();
    const data = await list.executeAllFromUserId(id, date);
    return response.status(200).json(data);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id  } = request.params;
    const show = new ShowUserReleaseService();
    const data = await show.execute({ id });
    return response.status(200).json(data);
  }
}
