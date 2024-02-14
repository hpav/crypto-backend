import { Injectable } from '@nestjs/common';
import { CoinstatsChain } from '../coinstats/coinstats-chain.entity';
import { CoinstatsService } from '../coinstats/coinstats.service';
import { CoinstatsCoin } from '../coinstats/coinstats-coin.entity';

export interface ChainWithCoins extends CoinstatsChain {
  coins: CoinstatsCoin[];
}

@Injectable()
export class WalletService {
  constructor(private coinstatsService: CoinstatsService) {}

  async getOverview(address: string): Promise<ChainWithCoins[]> {
    const coinsOverview = await this.coinstatsService.getCoinsOverview(address);
    const chains = await this.coinstatsService.getChains();

    return chains
      .map((chain) => ({
        ...chain,
        coins: coinsOverview
          .filter((item) => item.chain.id === chain.id)
          .map((item) => {
            return item.coin;
          }),
      }))
      .filter((coinsWithCoins: ChainWithCoins) => coinsWithCoins.coins.length);
  }
}
