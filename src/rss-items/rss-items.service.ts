import { RssOriginsService } from '../rss-origins/rss-origins.service';
import { RssOrigin } from '../rss-origins/domain/rss-origin';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateRssItemDto } from './dto/create-rss-item.dto';
import { UpdateRssItemDto } from './dto/update-rss-item.dto';
import { RssItemRepository } from './infrastructure/persistence/rss-item.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RssItem } from './domain/rss-item';

@Injectable()
export class RssItemsService {
  constructor(
    private readonly rssOriginService: RssOriginsService,

    // Dependencies here
    private readonly rssItemRepository: RssItemRepository,
  ) {}

  async create(createRssItemDto: CreateRssItemDto) {
    // Do not remove comment below.
    // <creating-property />
    const rssOriginObject = await this.rssOriginService.findById(
      createRssItemDto.rssOrigin.id,
    );
    if (!rssOriginObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          rssOrigin: 'notExists',
        },
      });
    }
    const rssOrigin = rssOriginObject;

    return this.rssItemRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      rssOrigin,

      data: createRssItemDto.data,

      content: createRssItemDto.content,

      title: createRssItemDto.title,

      url: createRssItemDto.url,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rssItemRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: RssItem['id']) {
    return this.rssItemRepository.findById(id);
  }

  findByIds(ids: RssItem['id'][]) {
    return this.rssItemRepository.findByIds(ids);
  }

  async update(
    id: RssItem['id'],

    updateRssItemDto: UpdateRssItemDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let rssOrigin: RssOrigin | undefined = undefined;

    if (updateRssItemDto.rssOrigin) {
      const rssOriginObject = await this.rssOriginService.findById(
        updateRssItemDto.rssOrigin.id,
      );
      if (!rssOriginObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            rssOrigin: 'notExists',
          },
        });
      }
      rssOrigin = rssOriginObject;
    }

    return this.rssItemRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      rssOrigin,

      data: updateRssItemDto.data,

      content: updateRssItemDto.content,

      title: updateRssItemDto.title,

      url: updateRssItemDto.url,
    });
  }

  remove(id: RssItem['id']) {
    return this.rssItemRepository.remove(id);
  }
}
