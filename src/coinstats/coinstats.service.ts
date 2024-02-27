import axios from 'axios';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CoinstatsChain } from './coinstats.dto';
import { CoinOverview, CoinstatsAmount, Method } from './coinstats.dto';
import { CoinstatsCoin } from './coinstats-coin.entity';

@Injectable()
export class CoinstatsService {
  constructor(
    @InjectRepository(CoinstatsCoin)
    private coinRepository: Repository<CoinstatsCoin>,
    private configService: ConfigService,
  ) {}

  async getChains(): Promise<CoinstatsChain[]> {
    const blockchains = await this.sendRequest(`wallet/blockchains`);

    return blockchains.map((blockchain) => ({
      connectionId: blockchain.connectionId,
      name: blockchain.name,
      icon: blockchain.icon?.replace(`.png`, `_dark.png`),
      code: blockchain.chain,
    }));
  }

  async getCoinsOverview(address: string): Promise<CoinOverview[]> {
    const chains: CoinstatsChain[] = await this.getChains();
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
