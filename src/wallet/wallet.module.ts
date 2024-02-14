import { Module } from '@nestjs/common';
import { CoinstatsModule } from '../coinstats/coinstats.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [CoinstatsModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [],
})
export class WalletModule {}
