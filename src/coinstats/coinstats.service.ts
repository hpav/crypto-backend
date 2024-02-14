import axios from 'axios';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CoinstatsChain } from './coinstats-chain.entity';
import { CoinOverview, CoinstatsAmount, Method } from './coinstats.dto';
import { CoinstatsCoin } from './coinstats-coin.entity';

@Injectable()
export class CoinstatsService {
  constructor(
    @InjectRepository(CoinstatsChain)
    private chainRepository: Repository<CoinstatsChain>,
    @InjectRepository(CoinstatsCoin)
    private coinRepository: Repository<CoinstatsCoin>,
    private configService: ConfigService,
  ) {}

  async getChains(): Promise<CoinstatsChain[]> {
    return await this.chainRepository.find();
  }

  async getCoinsOverview(address: string): Promise<CoinOverview[]> {
    const chains: CoinstatsChain[] = await this.chainRepository.find();
    const coins: CoinstatsCoin[] = await this.coinRepository.find();
    let coinstatsAmount: CoinstatsAmount[] = [];

    const promises = chains.map((chain) =>
      this.sendRequest(
        `wallet/balance?address=${address}&connectionId=${chain.connectionId}`,
      ),
    );

    const resolves = await Promise.all<CoinstatsAmount[]>(promises);

    resolves.forEach(
      (item: Awaited<CoinstatsAmount[]>) =>
        (coinstatsAmount = coinstatsAmount.concat(item)),
    );

    return coinstatsAmount
      .map((item) => ({
        coin: coins.find((coin: CoinstatsCoin) => item.coinId === coin.coinId),
        chain: chains.find(
          (chain: CoinstatsChain) => item.chain === chain.code,
        ),
      }))
      .filter((coinOverview) => coinOverview.coin);
  }

  private async sendRequest(
    path: string,
    method: Method = 'get',
    data: object = {},
  ): Promise<any> {
    path = path.replace(/\/+$/, '').trim();

    try {
      return axios({
        method,
        url: `${this.configService.get('coinstats.url')}/${path}`,
        headers: {
          'X-API-KEY': this.configService.get('coinstats.apiKey'),
        },
        data,
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw new InternalServerErrorException(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
}
