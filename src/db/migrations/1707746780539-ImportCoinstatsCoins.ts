import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';

import { CoinstatsCoin } from '../../coinstats/coinstats-coin.entity';

interface Coin extends Omit<CoinstatsCoin, 'id'> {}

export class ImportCoinstatsCoins1707746780539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rawData = fs.readFileSync('uploaded/coinstats-coins.json');
    const coins = JSON.parse(rawData.toString()) as Coin[];

    await queryRunner.query(`TRUNCATE "coinstats_coins" RESTART IDENTITY;`);

    for (const coin of coins) {
      queryRunner.manager.save(CoinstatsCoin, coin);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "coinstats_coins" RESTART IDENTITY;`);
  }
}
