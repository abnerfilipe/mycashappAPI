import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController{
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    const createSession = new CreateSessionsService();
    const user = await createSession.execute({
      username,
      password
    })

    return response.json(user);
  }
}
