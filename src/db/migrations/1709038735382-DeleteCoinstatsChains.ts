import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteCoinstatsChains1709038735382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "coinstats_chains"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "coinstats_chains" ("id" SERIAL NOT NULL, "connection_id" character varying NOT NULL, "name" character varying NOT NULL, "icon" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_25ad853e6c7824b016dc9711776" PRIMARY KEY ("id"))`,
    );
  }
}
