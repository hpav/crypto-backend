import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinstatsService } from './coinstats.service';
import { CoinstatsCoin } from './coinstats-coin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoinstatsCoin])],
  controllers: [],
  providers: [CoinstatsService],
  exports: [CoinstatsService],
})
export class CoinstatsModule {}
