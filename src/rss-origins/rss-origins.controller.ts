import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RssOriginsService } from './rss-origins.service';
import { CreateRssOriginDto } from './dto/create-rss-origin.dto';
import { UpdateRssOriginDto } from './dto/update-rss-origin.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RssOrigin } from './domain/rss-origin';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRssOriginsDto } from './dto/find-all-rss-origins.dto';

@ApiTags('Rssorigins')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'rss-origins',
  version: '1',
})
export class RssOriginsController {
  constructor(private readonly rssOriginsService: RssOriginsService) {}

  @Post()
  @ApiCreatedResponse({
    type: RssOrigin,
  })
  create(@Body() createRssOriginDto: CreateRssOriginDto) {
    return this.rssOriginsService.create(createRssOriginDto);
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
