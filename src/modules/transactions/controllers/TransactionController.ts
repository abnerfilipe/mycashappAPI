import { Request, Response } from "express";
import CreateTransactionService from "../services/CreateTransactionService";
import ListTransactionService from "../services/ListTransactionService";
import ShowBalanceTransactionService from "../services/ShowBalanceTransactionService";
import ShowTransactionService from "../services/ShowTransactionService";
import UpdateTransactionService from "../services/UpdateTransactionService";
import ITransactionUpdate from "../services/UpdateTransactionService"

export default class TransactionController{
  public async index(request: Request, response: Response): Promise<Response> {
    const listTransaction = new ListTransactionService();
    const transaction = await listTransaction.execute();
    return response.status(200).json(transaction);
  }
  public async indexFromUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listTransaction = new ListTransactionService();
    const transaction = await listTransaction.executeFromUser(id);
    return response.status(200).json(transaction);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showTransaction = new ShowTransactionService();
    const transaction = await showTransaction.execute({ id });
    return response.status(200).json(transaction);
  }
  public async balanceFromUser(request: Request, response: Response): Promise<Response> {
    const { user } = request.params;
    const { date } = request.body;
    const showBalanceTransaction = new ShowBalanceTransactionService();
    const balance = await showBalanceTransaction.execute({ user, date });
    return response.status(200).json({balance});
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    const createTransaction = new CreateTransactionService();
    const transaction = await createTransaction.execute(body)
    return response.status(200).json(transaction);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    const { id, user } = request.params;
    const updateTransaction = new UpdateTransactionService();
    const data = {
      value: body.value,
      description: body.description,
      type: body.type,
      id: id,
      user: user,
    };
    const transaction = await updateTransaction.execute(data);
    return response.status(200).json(transaction);
  }
}
