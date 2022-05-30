

import User from '@modules/users/typeorm/entities/User';
import Transaction from '@modules/transactions/typeorm/entities/Transaction';
import {
  Column, CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

export enum OperationType {
  UPDATE = 'u',
  CREATE = 'c'
}
@Entity('user_releases')
class UserRelease {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  operationType: OperationType;

  @Column('decimal')
  value: number;

  // @ManyToOne(() => Customer)
  // @JoinColumn({ name: 'customer_id' })
  // customer: Customer;

  @ManyToOne(() => Transaction)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
export default UserRelease;

