import { RssOriginEntity } from '../../../../../rss-origins/infrastructure/persistence/relational/entities/rss-origin.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'rss_item',
})
export class RssItemEntity extends EntityRelationalHelper {
  @ManyToOne(() => RssOriginEntity, { eager: true, nullable: false })
  rssOrigin: RssOriginEntity;

  @Column({
    nullable: false,
    type: String,
  })
  data: string;

  @Column({
    nullable: true,
    type: String,
  })
  content?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  title?: string | null;

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
