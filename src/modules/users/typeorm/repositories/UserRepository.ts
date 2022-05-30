import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User>{
  public async findByName(name: string): Promise<User | undefined>{
    const user = await this.findOne({
      where: {
        name
      }
    });
    return user;
  }
  public async findById(id: string): Promise<User | undefined>{
    const user = await this.findOne({
      where: {
        id
      }
    });
    return user;
  }
  public async findByUsername(username: string): Promise<User | undefined>{
    const user = await this.findOne({
      where: {
        username
      }
    });
    return user;
  }
  public async checkPassword(username: string,password: string): Promise<Boolean>{
    const user = await this
      .createQueryBuilder('user')
      .addSelect("user.password")
      .where("user.username = :username", {username: username})
      .getOne();

    if(user?.password === password) return true;
    return false;
  }

}

export default UserRepository;
