import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoinstatsCoins1707746699664 implements MigrationInterface {
  name = 'CreateCoinstatsCoins1707746699664';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "coinstats_coins" ("id" SERIAL NOT NULL, "coin_id" character varying NOT NULL, "name" character varying NOT NULL, "icon" character varying NOT NULL, "symbol" character varying NOT NULL, CONSTRAINT "PK_27c24df7bb7d24fec19f5320e1a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "coinstats_coins"`);
  }
}
