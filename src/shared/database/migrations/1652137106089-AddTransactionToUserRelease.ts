import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddTransactionToUserRelease1652137106089 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_releases',
      new TableColumn({
        name: 'transaction_id',
        type: 'int',
        isNullable: true,

      })
    )
    await queryRunner.createForeignKey(
      'user_releases',
      new TableForeignKey({
        name: 'UserReleasesTransaction',
        columnNames: ['transaction_id'],
        referencedTableName: 'transactions',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user_releases', 'UserReleasesTransaction');
    await queryRunner.dropColumn('user_releases','transaction_id')
  }
}
