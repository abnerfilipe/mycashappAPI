
import Transaction from '../../../../modules/transactions/typeorm/entities/Transaction';
import User from '../../../../modules/users/typeorm/entities/User';
import { EntityRepository, In, Repository } from 'typeorm';
import UserRelease from '../entities/UserRelease';

interface IRequest{
  transaction: Transaction;
  user: User;
}
@EntityRepository(UserRelease)
export class UserReleasesRepository extends Repository<UserRelease>{
  // public async findActiveReleaseFromToday({transaction,user}:IRequest): Promise<UserRelease[]> {
  //   const existRelease = await this.find({
  //     where: {
  //       user: In(user.id),
  //       transaction: In(transaction.id),
  //       createdAt: new Date(),
  //     }
  //   });
  //   return existRelease;
  // }
}
export default UserReleasesRepository;
