import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { RssOriginsModule } from '../rss-origins/rss-origins.module';
import { RssItemsModule } from '../rss-items/rss-items.module';

@Module({
  controllers: [RssController],
  providers: [RssService],
  imports: [RssOriginsModule, RssItemsModule],
})
export class RssModule {}
