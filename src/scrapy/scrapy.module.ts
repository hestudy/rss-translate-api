import { Module } from '@nestjs/common';
import { ScrapyService } from './scrapy.service';

@Module({
  providers: [ScrapyService],
})
export class ScrapyModule {}
