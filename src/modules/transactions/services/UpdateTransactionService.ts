import UserRelease, { OperationType } from "@modules/userReleases/typeorm/entities/UserRelease";
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from "typeorm";
import Transaction, { Type } from '../typeorm/entities/Transaction';
import { TransactionRepository } from "../typeorm/repositories/TransactionRepository";
import { UserReleasesRepository } from './../../userReleases/typeorm/repositories/UserReleasesRepository';

export interface ITransactionUpdate{
  type: Type;
  description: string;
  value: number;
  user: string;
  id: string;
}
interface IResponse{
  transaction: Transaction;
  userRelease: UserRelease;
}
class UpdateTransactionService{

  public async execute({ id ,type, description, value, user }: ITransactionUpdate): Promise<IResponse | undefined> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const userRepository = getCustomRepository(UserRepository);
    const userReleaseRepository = getCustomRepository(UserReleasesRepository);

    const transactionExist = await transactionRepository.getActiveTransactionThatIsOpenToUpdate(id);
    if(!transactionExist) throw new AppError("Transaction not found");

    const userExist = await userRepository.findOne({id: user});
    if(!userExist) throw new AppError("User not found");

    const transactionUpdated = await transactionRepository.update({id: transactionExist.id},{
      type: type, 
      description: description, 
      value: value,
    });

    const userReleaseCreated = await userReleaseRepository.create({
      transaction: transactionExist,
      user: userExist,
      value: value,
      operationType: OperationType.UPDATE
    });
    await userReleaseRepository.save(userReleaseCreated);
    if(!userReleaseCreated) throw new AppError("Release not created!");
   
    return { transaction: transactionUpdated, userRelease: userReleaseCreated } as unknown as IResponse;
  }
}

export default UpdateTransactionService;
