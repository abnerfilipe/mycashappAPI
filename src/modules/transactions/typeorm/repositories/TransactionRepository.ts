import AppError from "../../../../shared/errors/AppError";
import UserRelease, { OperationType } from '../../../../modules/userReleases/typeorm/entities/UserRelease';
import User from '../../../../modules/users/typeorm/entities/User';
import { EntityRepository, getCustomRepository, In, Repository } from 'typeorm';
import Transaction, { Status, Type } from '../entities/Transaction';
import { UserReleasesRepository } from './../../../userReleases/typeorm/repositories/UserReleasesRepository';
import { isSameDay } from 'date-fns';

export interface ITransaction{
  id?: string;
  type: Type;
  status?: Status;
  description: String;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IRequest{
  transaction: Transaction;
  user: User;
}
interface IResponse{
  transaction: Transaction;
  user: User;
  userRelease: UserRelease;
}

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction>{

  public async findById(id: string): Promise<Transaction | undefined> {
    return this.findOne(id);
  }

  public async createTransaction({ transaction, user }:IRequest): Promise<IResponse>{
    const newTransaction = this.create(transaction);
    await this.save(newTransaction);

    // cria user realease
    const userReleasesRepository = getCustomRepository(UserReleasesRepository);
    const userRelease = await userReleasesRepository.create({
      transaction: newTransaction,
      user: user,
      operationType: OperationType.CREATE,
      value: newTransaction.value,
    });
    await userReleasesRepository.save(userRelease);

    return {
      transaction: newTransaction,
      user: user,
      userRelease: userRelease,
    };
  }
  public async getActiveTransactionThatIsOpenToUpdate(transaction: string): Promise<Transaction | undefined> {
    const existTransaction = await this.findOne({
      where: {
        id: transaction,
        status: Status.ATIVO
      }
    });
    
    if(!existTransaction) return undefined;
    // checa se a transaction foi criado hoje
    const createdAt = new Date(new Date(existTransaction.createdAt).toLocaleString("en-US", {timeZone: 'Etc/UTC'}));
    
    const todayIs = new Date(new Date().toLocaleString("en-US", {timeZone: 'Etc/UTC'}));
    if(isSameDay(createdAt,todayIs)){
      return existTransaction;
    }
    else throw new AppError("Essa transaction nao pode ser atualizada, pois esta fora do prazo de atualizacao!");

  }
}
