import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { RssItemConsumer } from '../consumer/rss-items.consumer';
import { RssOriginConsumer } from '../consumer/rss-origins.consumer';
import { RelationalRssItemPersistenceModule } from '../rss-items/infrastructure/persistence/relational/relational-persistence.module';
import { RssItemsService } from '../rss-items/rss-items.service';
import { RelationalRssOriginPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RssOriginsController } from './rss-origins.controller';
import { RssOriginsService } from './rss-origins.service';
import { TranslateService } from '../translate/translate.service';
import { ScrapyService } from '../scrapy/scrapy.service';

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
    TranslateService,
    ScrapyService,
  ],
  exports: [RssOriginsService, RelationalRssOriginPersistenceModule],
})
export class RssOriginsModule {}
