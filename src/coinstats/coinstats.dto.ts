export type Method = 'get' | 'post' | 'patch';

export interface Balance {
  coinId: string;
  amount: number;
  chain: string;
}
