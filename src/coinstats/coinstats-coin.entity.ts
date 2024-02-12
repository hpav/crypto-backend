import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coinstats_coins')
export class CoinstatsCoin {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { name: 'coin_id' })
  coinId: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  icon: string;

  @Column('varchar')
  symbol: string;
}
