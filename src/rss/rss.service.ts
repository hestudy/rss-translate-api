import { Injectable, NotFoundException } from '@nestjs/common';
import Rss from 'rss';
import { RssOriginsService } from '../rss-origins/rss-origins.service';
import { RssItemsService } from '../rss-items/rss-items.service';

@Injectable()
export class RssService {
  constructor(
    private readonly rssOriginService: RssOriginsService,
    private readonly rssItemService: RssItemsService,
  ) {}

  async rss(id: string) {
    const result = await this.rssOriginService.findById(id);
    if (!result?.id) {
      throw new NotFoundException();
    }
    const items = await this.rssItemService.findByRssOrigin(result?.id);
    const feed = new Rss({
      feed_url: result?.url || '',
      site_url: result?.data?.url || '',
      title: result?.data?.title || '',
      description: result?.data?.description,
      pubDate: result?.data?.pubDate,
      generator: result?.data?.generator,
    });
    items?.forEach((item) => {
      feed.item({
        url: item.url || '',
        date: item.data.pubDate || '',
        title: item.title || '',
        description: item.content || '',
        author: item.data.creator,
        guid: item.data.guid,
      });
    });

    return feed.xml();
  }
}
