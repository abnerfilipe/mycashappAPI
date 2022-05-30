import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import UserRelease from "@modules/userReleases/typeorm/entities/UserRelease";
import User from "@modules/users/typeorm/entities/User";
import { getCustomRepository } from "typeorm";
import Transaction, { Type } from '../typeorm/entities/Transaction';

import AppError from '@shared/errors/AppError';
import { ITransaction, TransactionRepository } from '../typeorm/repositories/TransactionRepository';

interface IRequest{
  type: Type;
  description: string;
  value: number;
  user: string;
}
interface IResponse{
  transaction: Transaction;
  user: User;
  userRelease: UserRelease;
}
class CreateTransactionService{

  public async execute({ type, description, value, user }: IRequest): Promise<IResponse | undefined> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const userRepository = getCustomRepository(UserRepository);

    const userExist = await userRepository.findOne({id: user});
    if(!userExist) throw new AppError("User not found");
    
    const transaction = {
      type, description, value
    } as ITransaction as Transaction;

    const data = await transactionRepository.createTransaction({ transaction, user: userExist })

    return data;
  }
}

export default CreateTransactionService;
