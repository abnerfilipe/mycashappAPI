import AppError from "../../../shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";


interface IRequest{
  user_id: string
  name: string
  username: string
  password: string
  old_password: string
}
class UpdateUserService{
  public async execute({
    user_id,
    name,
    username,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found.");
    }
    const userUpdateEmail = await userRepository.findByUsername(username);
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError("There is already one user with this email.");
    }
    if (password && !old_password) {
      throw new AppError("Old password is required.");
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("Old password doesnt match.");

      }
      user.password = await hash(password, 10);
    }
    user.name = name;
    user.username = username;
    await userRepository.save(user);
    return user;
  }

}

export default UpdateUserService;
