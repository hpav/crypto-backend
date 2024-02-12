import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinstatsChain } from './coinstats-chain.entity';
import { CoinstatsService } from './coinstats.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoinstatsChain])],
  controllers: [],
  providers: [CoinstatsService],
  exports: [CoinstatsService],
})
export class CoinstatsModule {}
