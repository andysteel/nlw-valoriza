import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1624679103682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'compliment',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'user_sender',
              type: 'uuid'
            },
            {
              name: 'user_receiver',
              type: 'uuid'
            },
            {
              name: 'tag_id',
              type: 'uuid'
            },
            {
              name: 'message',
              type: 'varchar'
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            }
          ],
          foreignKeys: [
            {
              name: 'FK_user_sender_compliment',
              referencedTableName: 'user',
              referencedColumnNames: ['id'],
              columnNames: ['user_sender'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL'
            },
            {
              name: 'FK_user_receiver_compliment',
              referencedTableName: 'user',
              referencedColumnNames: ['id'],
              columnNames: ['user_receiver'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL'
            },
            {
              name: 'FK_tag_compliment',
              referencedTableName: 'tag',
              referencedColumnNames: ['id'],
              columnNames: ['tag_id'],
              onDelete: 'SET NULL',
              onUpdate: 'SET NULL'
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('compliment')
    }

}
