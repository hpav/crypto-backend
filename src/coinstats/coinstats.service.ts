import axios from 'axios';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CoinstatsChain } from './coinstats-chain.entity';
import { Balance, Method } from './coinstats.dto';

@Injectable()
export class CoinstatsService {
  constructor(
    @InjectRepository(CoinstatsChain)
    private chainRepository: Repository<CoinstatsChain>,
    private configService: ConfigService,
  ) {}

  async getChains(): Promise<CoinstatsChain[]> {
    return await this.chainRepository.find();
  }

  async getWalletBalance(
    address: string,
    connectionId: string,
  ): Promise<Balance[]> {
    return this.sendRequest(
      `/wallet/balance?address=${address}&connectionId=${connectionId}`,
    );
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
