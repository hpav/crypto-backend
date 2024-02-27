import { Module } from '@nestjs/common';
import { CoinstatsModule } from '../coinstats/coinstats.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';

@Module({
  imports: [CoinstatsModule, TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [],
})
export class WalletModule {}
