import { Module } from '@nestjs/common';
import { RssOriginRepository } from '../rss-origin.repository';
import { RssOriginRelationalRepository } from './repositories/rss-origin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssOriginEntity } from './entities/rss-origin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RssOriginEntity])],
  providers: [
    {
      provide: RssOriginRepository,
      useClass: RssOriginRelationalRepository,
    },
  ],
  exports: [RssOriginRepository],
})
export class RelationalRssOriginPersistenceModule {}
