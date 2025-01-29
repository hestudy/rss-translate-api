import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { RssOriginConsumer } from '../consumer/rss-origins.consumer';
import { RssItemsService } from '../rss-items/rss-items.service';
import { RelationalRssOriginPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RssOriginsController } from './rss-origins.controller';
import { RssOriginsService } from './rss-origins.service';
import { RelationalRssItemPersistenceModule } from '../rss-items/infrastructure/persistence/relational/relational-persistence.module';
import { RssItemConsumer } from '../consumer/rss-items.consumer';

@Module({
  imports: [
    // import modules, etc.
    RelationalRssOriginPersistenceModule,
    RelationalRssItemPersistenceModule,
    BullModule.registerQueue({
      name: 'rssOrigin',
    }),
    BullModule.registerQueue({
      name: 'rssItem',
    }),
  ],
  controllers: [RssOriginsController],
  providers: [
    RssOriginsService,
    RssOriginConsumer,
    RssItemsService,
    RssItemConsumer,
  ],
  exports: [RssOriginsService, RelationalRssOriginPersistenceModule],
})
export class RssOriginsModule {}
