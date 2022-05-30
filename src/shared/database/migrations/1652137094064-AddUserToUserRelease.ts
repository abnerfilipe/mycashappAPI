import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserToUserRelease1652137094064 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_releases',
      new TableColumn({
        name: 'user_id',
        type: 'int',
        isNullable: true,

      })
    )
    await queryRunner.createForeignKey(
      'user_releases',
      new TableForeignKey({
        name: 'UserReleasesUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user_releases', 'UserReleasesUser');
    await queryRunner.dropColumn('user_releases','user_id')
  }
}
