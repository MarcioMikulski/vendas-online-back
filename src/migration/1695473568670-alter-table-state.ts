import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableState1695473568670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE state
                ADD uf VARCHAR(2) NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE state
                drop uf;
        `);
  }
}
