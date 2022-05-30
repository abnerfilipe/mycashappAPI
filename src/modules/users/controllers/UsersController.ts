import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import LoginUserService from "../services/LoginUserService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";


export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();
    return response.status(200).json(classToClass(users));
  }
  public async create(request: Request, response: Response) {
    const { username, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ username, password });
    return response.status(200).json(classToClass(user));
  }
  public async login(request: Request, response: Response) {
    const { username, password } = request.body;
    const login = new LoginUserService();
    const data = await login.execute({ username, password });
    return response.status(200).json(data);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowUserService();
    const { id } = request.params;
    const user = await showProfile.execute(id);

    return response.status(200).json(classToClass(user));
  }
  public async update(request: Request, response: Response) {
    const { name, username, password, old_password } = request.body;
    const user_id = request.user.id;
    const updateProfileService = new UpdateUserService();
    const user = await updateProfileService.execute({user_id, name, username, password,old_password });
    return response.status(200).json(classToClass(user));
  }
}
