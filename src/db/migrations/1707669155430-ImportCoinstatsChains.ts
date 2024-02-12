import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';

import { CoinstatsChain } from '../../coinstats/coinstats-chain.entity';

interface Chain {
  connectionId: string;
  name: string;
  icon: string;
  chain: string;
}

export class ImportCoinstatsChains1707669155430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rawData = fs.readFileSync('uploaded/coinstats-chains.json');
    const chains = JSON.parse(rawData.toString()) as Chain[];

    await queryRunner.query(`TRUNCATE "coinstats_chains" RESTART IDENTITY;`);

    for (const chain of chains) {
      queryRunner.manager.save(CoinstatsChain, {
        connectionId: chain.connectionId,
        name: chain.name,
        icon: chain.icon,
        code: chain.chain,
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "coinstats_chains" RESTART IDENTITY;`);
  }
}
