import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  address: string;

  @Column('varchar', { name: 'connection_id' })
  connectionId: string;
}
