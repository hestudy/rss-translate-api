import {
  InjectQueue,
  OnWorkerEvent,
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import Parser from 'rss-parser';
import { RssItemsService } from '../rss-items/rss-items.service';
import { RssOrigin } from '../rss-origins/domain/rss-origin';
import { RssOriginsService } from '../rss-origins/rss-origins.service';

@Processor('rssOrigin', {
  concurrency: 1,
})
export class RssOriginConsumer extends WorkerHost {
  private parser = new Parser();
  constructor(
    private readonly rssOriginsService: RssOriginsService,
    private readonly rssItemsService: RssItemsService,
    @InjectQueue('rssItem') private rssItemQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<RssOrigin>): Promise<any> {
    const feed = await this.parser.parseURL(job.data.url);

    await this.rssOriginsService.update(job.data.id, {
      data: feed,
    });

    for await (const item of feed.items) {
      const count = await this.rssItemsService.countByUrlAndRssOrigin(
        item.link!,
        job.data.id,
      );
      if (!count) {
        const result = await this.rssItemsService.create({
          data: item,
          rssOrigin: job.data,
          url: item.link!,
          title: item.title,
          content: item.content,
          pubDate: item.pubDate ? new Date(item.pubDate) : null,
        });
        await this.rssItemQueue.add('translateRss', result, {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        });
      }
    }
  }

  private readonly logger = new Logger(RssOriginConsumer.name, {
    timestamp: true,
  });

  @OnWorkerEvent('progress')
  onProgress(job: Job<RssOrigin>) {
    this.logger.log(
      `job ${job.name} is progress, fetching rss url ${job.data.url}`,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<RssOrigin>) {
    this.logger.log(
      `job ${job.name} is completed, fetched rss url ${job.data.url}`,
    );
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<RssOrigin>, error: Error) {
    this.logger.error(
      `job ${job.name} is failed, fetch error rss url ${job.data.url}, error: ${error.message}`,
      error,
    );
  }
}
