import { Injectable } from '@nestjs/common';
import { CreateRssOriginDto } from './dto/create-rss-origin.dto';
import { UpdateRssOriginDto } from './dto/update-rss-origin.dto';
import { RssOriginRepository } from './infrastructure/persistence/rss-origin.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RssOrigin } from './domain/rss-origin';

@Injectable()
export class RssOriginsService {
  constructor(
    // Dependencies here
    private readonly rssOriginRepository: RssOriginRepository,
  ) {}

  async create(createRssOriginDto: CreateRssOriginDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.rssOriginRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      data: createRssOriginDto.data,

      url: createRssOriginDto.url,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rssOriginRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: RssOrigin['id']) {
    return this.rssOriginRepository.findById(id);
  }

  findByIds(ids: RssOrigin['id'][]) {
    return this.rssOriginRepository.findByIds(ids);
  }

  async update(
    id: RssOrigin['id'],

    updateRssOriginDto: UpdateRssOriginDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.rssOriginRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      data: updateRssOriginDto.data,

      url: updateRssOriginDto.url,
    });
  }

  remove(id: RssOrigin['id']) {
    return this.rssOriginRepository.remove(id);
  }
}
