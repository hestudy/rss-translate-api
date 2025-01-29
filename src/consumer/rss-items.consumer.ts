import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bullmq';
import { AllConfigType } from '../config/config.type';
import { RssItem } from '../rss-items/domain/rss-item';
import { RssItemsService } from '../rss-items/rss-items.service';
import { RssOrigin } from '../rss-origins/domain/rss-origin';
import { ScrapyService } from '../scrapy/scrapy.service';
import { TranslateService } from '../translate/translate.service';

@Processor('rssItem', {
  concurrency: 1,
})
export class RssItemConsumer extends WorkerHost {
  constructor(
    private readonly rssItemsService: RssItemsService,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly translateService: TranslateService,
    private readonly scrapyService: ScrapyService,
  ) {
    super();
  }

  async process(job: Job<RssItem>): Promise<any> {
    const title = await this.translateService.translate(job.data.title || '');
    let content = '';
    if (this.configService.get('app.scrapyFull', { infer: true })) {
      const markdown = await this.scrapyService.scrapy(job.data.url);
      if (markdown) {
        content = await this.translateService.translate(markdown);
      }
    } else {
      content = await this.translateService.translate(job.data.content || '');
    }
    await this.rssItemsService.update(job.data.id, {
      title,
      content,
    });
  }

  private readonly logger = new Logger(RssItemConsumer.name, {
    timestamp: true,
  });

  @OnWorkerEvent('progress')
  onProgress(job: Job<RssOrigin>) {
    this.logger.log(
      `job ${job.name} is progress, translating rss url ${job.data.url}`,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<RssOrigin>) {
    this.logger.log(
      `job ${job.name} is completed, translated rss url ${job.data.url}`,
    );
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<RssOrigin>, error: Error) {
    this.logger.error(
      `job ${job.name} is failed, translate error rss url ${job.data.url}, error: ${error.message}`,
      error,
    );
  }
}
