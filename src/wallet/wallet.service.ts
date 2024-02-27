import { Injectable } from '@nestjs/common';
import { ChainWithCoins } from './wallet.dto';
import { CoinstatsService } from '../coinstats/coinstats.service';
import { WalletAddInput } from './wallet.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private coinstatsService: CoinstatsService,
  ) {}

  async getOverview(address: string): Promise<ChainWithCoins[]> {
    const coinsOverview = await this.coinstatsService.getCoinsOverview(address);
    const chains = await this.coinstatsService.getChains();

    return chains
      .map((chain) => ({
        ...chain,
        coins: coinsOverview
          .filter((item) => item.chain.connectionId === chain.connectionId)
          .map((item) => {
            return item.coin;
          }),
      }))
      .filter((coinsWithCoins: ChainWithCoins) => coinsWithCoins.coins.length);
  }

  async addWallet(walletAddInput: WalletAddInput): Promise<void> {
    const { address, connectionIds } = walletAddInput;

    for (const connectionId of connectionIds) {
      await this.walletRepository.save({ address, connectionId });
    }
  }
}
