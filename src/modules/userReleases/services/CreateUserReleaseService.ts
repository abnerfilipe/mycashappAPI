import Transaction from "@modules/transactions/typeorm/entities/Transaction";
import User from "@modules/users/typeorm/entities/User";
import { getCustomRepository } from "typeorm";
import UserRelease from "../typeorm/entities/UserRelease";
import UserReleasesRepository from "../typeorm/repositories/UserReleasesRepository";

interface IRequest{
  user: User;
  transaction: Transaction;
  operation_type: any;
}

class CreateUserReleaseService{
  public async execute({ user, transaction, operation_type }: IRequest): Promise<UserRelease> {
    const userReleaseRepository = getCustomRepository(UserReleasesRepository);
    // const exists = await repository.find({});
    // if (exists) {
    //   throw new AppError("There is already one product with this name");
    // }
    const data = { user, transaction, operation_type };
    const userRelease = userReleaseRepository.create(data);
    return userRelease;
  }

}

export default CreateUserReleaseService;
