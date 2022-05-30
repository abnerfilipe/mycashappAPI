import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";



interface IRequest{
  username: string
  password: string
}

class CreateUserService{

  public async execute({ username, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExists = await userRepository.findByUsername(username);
    if (emailExists) {
      throw new AppError("Email address already used.");
    }
    // const hashPassword = await hash(password,10);
    const user = userRepository.create({
      username,
      password,
    })
    await userRepository.save(user);
    return user;
  }

}

export default CreateUserService;
