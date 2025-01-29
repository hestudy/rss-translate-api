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
import { RssItemsService } from './rss-items.service';
import { CreateRssItemDto } from './dto/create-rss-item.dto';
import { UpdateRssItemDto } from './dto/update-rss-item.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RssItem } from './domain/rss-item';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRssItemsDto } from './dto/find-all-rss-items.dto';

@ApiTags('Rssitems')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'rss-items',
  version: '1',
})
export class RssItemsController {
  constructor(private readonly rssItemsService: RssItemsService) {}

  @Post()
  @ApiCreatedResponse({
    type: RssItem,
  })
  create(@Body() createRssItemDto: CreateRssItemDto) {
    return this.rssItemsService.create(createRssItemDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(RssItem),
  })
  async findAll(
    @Query() query: FindAllRssItemsDto,
  ): Promise<InfinityPaginationResponseDto<RssItem>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.rssItemsService.findAllWithPagination({
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
    type: RssItem,
  })
  findById(@Param('id') id: string) {
    return this.rssItemsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RssItem,
  })
  update(@Param('id') id: string, @Body() updateRssItemDto: UpdateRssItemDto) {
    return this.rssItemsService.update(id, updateRssItemDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.rssItemsService.remove(id);
  }
}
