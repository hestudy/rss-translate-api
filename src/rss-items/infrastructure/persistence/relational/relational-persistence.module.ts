import { Module } from '@nestjs/common';
import { RssItemRepository } from '../rss-item.repository';
import { RssItemRelationalRepository } from './repositories/rss-item.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssItemEntity } from './entities/rss-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RssItemEntity])],
  providers: [
    {
      provide: RssItemRepository,
      useClass: RssItemRelationalRepository,
    },
  ],
  exports: [RssItemRepository],
})
export class RelationalRssItemPersistenceModule {}
