
import {Entity,PrimaryGeneratedColumn, Column, CreateDateColumn,UpdateDateColumn} from 'typeorm';

export enum Type {
  PAGAMENTO = 'p',
  RECEBIMENTO = 'r'
}
export enum Status {
  ATIVO = '1',
  INATIVO = '0'
}
@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  type: Type;

  @Column()
  description: string;

  @Column({length: 1})
  status: Status;

  @Column('decimal')
  value: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

export default Transaction;
