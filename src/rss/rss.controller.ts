import { Controller, Get, Header, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { RssService } from './rss.service';

@ApiTags('Rss')
@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @Header('Content-Type', 'text/xml')
  rss(@Param('id') id: string) {
    return this.rssService.rss(id);
  }
}
