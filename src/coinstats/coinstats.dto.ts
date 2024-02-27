import { CoinstatsCoin } from './coinstats-coin.entity';

export type Method = 'get' | 'post' | 'patch';

export interface CoinstatsChain {
  connectionId: string;
  name: string;
  icon: string;
  code: string;
}

export interface CoinstatsAmount {
  coinId: string;
  amount: number;
  chain: string;
}

export interface CoinOverview {
  coin: CoinstatsCoin;
  chain: CoinstatsChain;
}
