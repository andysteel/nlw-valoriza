import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTags1624503427701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
        name: 'tag',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'tipestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'tipestamp',
            default: 'now()'
          }
        ],
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('tag');
    }

}
