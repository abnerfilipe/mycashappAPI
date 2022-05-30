import AppError from "../../../shared/errors/AppError";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";



interface IRequest{
  username: string;
  password: string;
};

class LoginUserService{

  public async execute({ username, password }: IRequest): Promise<any | null> {
    const userRepository = getCustomRepository(UserRepository);
    const result = await userRepository.checkPassword(username,password);
    const user = await userRepository.findOne({username:username});
    if(result == true) return {token: randomUUID(),user: user};
    else throw new AppError("Senha Incorreta");
    
  }

}

export default LoginUserService;
