import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Transactions1651645118932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'transactions',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'type',
              type: 'varchar',
              length: '1',
            },
            {
              name: 'description',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'varchar',
              length: '1',
              default: '1',
            },
            {
              name: 'value',
              type: 'decimal',
              precision: 10,
              scale: 2,
              isNullable: false,
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'now()',
            }
          ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('transactions')
    }

}
