import { Module } from '@nestjs/common';
import { RssOriginsService } from './rss-origins.service';
import { RssOriginsController } from './rss-origins.controller';
import { RelationalRssOriginPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalRssOriginPersistenceModule,
  ],
  controllers: [RssOriginsController],
  providers: [RssOriginsService],
  exports: [RssOriginsService, RelationalRssOriginPersistenceModule],
})
export class RssOriginsModule {}
