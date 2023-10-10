import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1696979246904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`alter table public.user add Unique(email);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
