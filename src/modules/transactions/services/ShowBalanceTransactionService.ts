import { UserReleasesRepository } from './../../userReleases/typeorm/repositories/UserReleasesRepository';
import { Between, getCustomRepository, In } from "typeorm";
import { TransactionRepository } from "../typeorm/repositories/TransactionRepository";
import { setHours,setMinutes,setSeconds } from 'date-fns';
import AppError from '../../../shared/errors/AppError';

interface IRequest{ 
  user: string, 
  date: Date, 
}

class ShowBalanceTransactionService{

  public async execute({ user, date }: IRequest): Promise<Number | undefined> { 
    try {
      const transactionRepository = getCustomRepository(TransactionRepository);
      const userReleaseRepository = getCustomRepository(UserReleasesRepository);

      let dateInital:any = setSeconds(setMinutes(setHours(new Date(date),0),0),0);
      let dateFinal:any = setSeconds(setMinutes(setHours(new Date(date),23),59),59);

      const transactions = await userReleaseRepository.find({
        where: {
          user: user,
          createdAt: Between(dateInital,dateFinal)
        },
        relations: ["transaction"]
      })
      const transactionsIds = transactions.map(i => i.transaction.id);

      const data = await transactionRepository.find({
        where: {
          id: In(transactionsIds),
        }
      });
      let balance = 0;
      data.forEach(i => {
        balance = balance + Number(i.value);
      });
      
      return balance;
    } catch (error:any) {
      throw new AppError(`${error.message}`,400);
      
    }
  }

}

export default ShowBalanceTransactionService;
