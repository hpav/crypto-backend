import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImportCoinstatsChains1707669155430 implements MigrationInterface {
  public async up(): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "coinstats_chains" RESTART IDENTITY;`);
  }
}
