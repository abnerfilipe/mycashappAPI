
import { getCustomRepository } from "typeorm";
import Transaction from '../typeorm/entities/Transaction';
import { TransactionRepository } from "../typeorm/repositories/TransactionRepository";



class ListTransactionService{

  public async execute(): Promise<Transaction[] | undefined> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const data = await transactionRepository.find({});

    return data;
  }

}

export default ListTransactionService;
