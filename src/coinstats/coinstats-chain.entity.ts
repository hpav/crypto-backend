import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coinstats_chains')
export class CoinstatsChain {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { name: 'connection_id' })
  connectionId: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  icon: string;

  @Column('varchar')
  code: string;
}
