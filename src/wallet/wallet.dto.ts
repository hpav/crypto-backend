import { CoinstatsChain } from '../coinstats/coinstats.dto';
import { CoinstatsCoin } from '../coinstats/coinstats-coin.entity';

export interface ChainWithCoins extends CoinstatsChain {
  coins: CoinstatsCoin[];
}
