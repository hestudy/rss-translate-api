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
  @Column({
    nullable: true,
    type: Date,
  })
  pubDate?: Date | null;

  @ManyToOne(() => RssOriginEntity, (e) => e.items, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  rssOrigin: RssOriginEntity;

  @Column({
    nullable: false,
    type: 'json',
  })
  data: object;

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
