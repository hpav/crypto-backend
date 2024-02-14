import { CoinstatsCoin } from './coinstats-coin.entity';
import { CoinstatsChain } from './coinstats-chain.entity';

export type Method = 'get' | 'post' | 'patch';

export interface CoinstatsAmount {
  coinId: string;
  amount: number;
  chain: string;
}

export interface CoinOverview {
  coin: CoinstatsCoin;
  chain: CoinstatsChain;
}
