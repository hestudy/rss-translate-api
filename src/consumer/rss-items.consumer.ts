import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { RssItem } from '../rss-items/domain/rss-item';
import { RssItemsService } from '../rss-items/rss-items.service';
import { RssOrigin } from '../rss-origins/domain/rss-origin';
import { RssOriginsService } from '../rss-origins/rss-origins.service';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import FirecrawlApp from '@mendable/firecrawl-js';

@Processor('rssItem', {
  concurrency: 1,
})
export class RssItemConsumer extends WorkerHost {
  constructor(
    private readonly rssOriginsService: RssOriginsService,
    private readonly rssItemsService: RssItemsService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    super();
  }

  private readonly fireCrawl = new FirecrawlApp({
    apiUrl: this.configService.get('app.fireCrawlUrl', { infer: true }),
  });

  async process(job: Job<RssItem>): Promise<any> {
    const res = await this.fireCrawl.scrapeUrl(job.data.url, {
      formats: ['markdown'],
    });
    this.logger.debug(res);
  }

  private readonly logger = new Logger(RssItemConsumer.name, {
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
