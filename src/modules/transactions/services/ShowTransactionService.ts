import { getCustomRepository } from "typeorm";
import Transaction from '../typeorm/entities/Transaction';
import { TransactionRepository } from "../typeorm/repositories/TransactionRepository";

interface IRequest{
  id: string
}

class ShowTransactionService{

  public async execute({ id }: IRequest): Promise<Transaction | undefined> { 
    const transactionRepository = getCustomRepository(TransactionRepository);
    const data = await transactionRepository.findById(id)

    return data;
  }

}

export default ShowTransactionService;
