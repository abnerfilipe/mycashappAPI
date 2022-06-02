import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import { sign } from 'jsonwebtoken';
import authConfig from "@config/auth";


interface IRequest{
  email: string
  password: string
}
interface IResponse{
  user: User;
  token: string;
}

class CreateSessionsService{

  public async execute({ email, password }: IRequest): Promise<any> {
    // const userRepository = getCustomRepository(UserRepository);
    // const user = await userRepository.find({email: email});
    // if (!user) {
    //   throw new AppError("Incorrect email.",403);
    // }
    // const passwordConfirmed = await compare(password, user.password);
    // if (!passwordConfirmed) {
    //   throw new AppError("Incorrect password.");
    // }
    // const token = sign({}, authConfig.jwt.secret, {
    //   subject: user.id,
    //   expiresIn: authConfig.jwt.expiresIn,
    // });
    // return {
    //   user,
    //   token
    // };
  }

}

export default CreateSessionsService;
