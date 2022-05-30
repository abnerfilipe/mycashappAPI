import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserReleases1651642797199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'user_releases',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'operationType',
            type: 'varchar',
            length: '1',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
            default: 0
          },
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_releases')
    }

}
