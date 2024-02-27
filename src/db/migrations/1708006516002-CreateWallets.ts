import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWallets1708006516002 implements MigrationInterface {
  name = 'CreateWallets1708006516002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wallets" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "connection_id" character varying NOT NULL, CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "wallets"`);
  }
}
