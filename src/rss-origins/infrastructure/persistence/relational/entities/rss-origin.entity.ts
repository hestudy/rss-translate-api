import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { RssItemEntity } from '../../../../../rss-items/infrastructure/persistence/relational/entities/rss-item.entity';

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

  @OneToMany(() => RssItemEntity, (e) => e.rssOrigin)
  items: RssItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
