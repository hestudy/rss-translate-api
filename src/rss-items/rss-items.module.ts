import { RssOriginsModule } from '../rss-origins/rss-origins.module';
import { Module } from '@nestjs/common';
import { RssItemsService } from './rss-items.service';
import { RssItemsController } from './rss-items.controller';
import { RelationalRssItemPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    RssOriginsModule,

    // import modules, etc.
    RelationalRssItemPersistenceModule,
  ],
  controllers: [RssItemsController],
  providers: [RssItemsService],
  exports: [RssItemsService, RelationalRssItemPersistenceModule],
})
export class RssItemsModule {}
