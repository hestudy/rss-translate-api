import FirecrawlApp from '@mendable/firecrawl-js';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class ScrapyService {
  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  private readonly fireCrawl = new FirecrawlApp({
    apiUrl: this.configService.get('app.fireCrawlUrl', { infer: true }),
  });

  private readonly logger = new Logger(ScrapyService.name, { timestamp: true });

  async scrapy(url: string) {
    this.logger.debug('scraping:', url);
    const res = await this.fireCrawl.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: true,
    });
    if (res.success) {
      this.logger.debug('scrapyed', res.markdown);
      return res.markdown;
    }
  }
}
