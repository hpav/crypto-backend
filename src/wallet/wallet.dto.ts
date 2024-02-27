import { CoinstatsChain } from '../coinstats/coinstats-chain.entity';
import { CoinstatsCoin } from '../coinstats/coinstats-coin.entity';

export interface ChainWithCoins extends CoinstatsChain {
  coins: CoinstatsCoin[];
}
