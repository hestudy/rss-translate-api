import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { RssOrigin } from './domain/rss-origin';
import { CreateRssOriginDto } from './dto/create-rss-origin.dto';
import { FindAllRssOriginsDto } from './dto/find-all-rss-origins.dto';
import { UpdateRssOriginDto } from './dto/update-rss-origin.dto';
import { RssOriginsService } from './rss-origins.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';

@ApiTags('Rssorigins')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'rss-origins',
  version: '1',
})
export class RssOriginsController {
  constructor(
    private readonly rssOriginsService: RssOriginsService,
    @InjectQueue('rssItem') private rssItemQueue: Queue,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: RssOrigin,
  })
  create(@Body() createRssOriginDto: CreateRssOriginDto) {
    return this.rssOriginsService.create(createRssOriginDto);
  }

  @Get('test')
  async test() {
    const job: Job = await this.rssItemQueue.getJob('1');
    await job.retry('failed');
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(RssOrigin),
  })
  async findAll(
    @Query() query: FindAllRssOriginsDto,
  ): Promise<InfinityPaginationResponseDto<RssOrigin>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.rssOriginsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RssOrigin,
  })
  findById(@Param('id') id: string) {
    return this.rssOriginsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RssOrigin,
  })
  update(
    @Param('id') id: string,
    @Body() updateRssOriginDto: UpdateRssOriginDto,
  ) {
    return this.rssOriginsService.update(id, updateRssOriginDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.rssOriginsService.remove(id);
  }
}
