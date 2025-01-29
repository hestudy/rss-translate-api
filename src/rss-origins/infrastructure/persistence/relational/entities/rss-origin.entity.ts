import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'rss_origin',
})
export class RssOriginEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  job?: string | null;

  @Column({
    nullable: true,
    type: 'json',
  })
  data?: object | null;

  @Column({
    nullable: false,
    type: String,
  })
  url: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
