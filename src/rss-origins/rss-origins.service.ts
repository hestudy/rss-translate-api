import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RssOrigin } from './domain/rss-origin';
import { CreateRssOriginDto } from './dto/create-rss-origin.dto';
import { UpdateRssOriginDto } from './dto/update-rss-origin.dto';
import { RssOriginRepository } from './infrastructure/persistence/rss-origin.repository';

@Injectable()
export class RssOriginsService {
  constructor(
    // Dependencies here
    private readonly rssOriginRepository: RssOriginRepository,
    @InjectQueue('rssOrigin') private rssOriginQueue: Queue,
  ) {}

  async create(createRssOriginDto: CreateRssOriginDto) {
    // Do not remove comment below.
    // <creating-property />

    const result = await this.rssOriginRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      job: createRssOriginDto.job,

      data: createRssOriginDto.data,

      url: createRssOriginDto.url,
    });

    await this.rssOriginQueue.add('fetchRss', result, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });

    const job = await this.rssOriginQueue.add('fetchRss', result, {
      repeat: {
        pattern: '0 * * * *',
      },
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });

    await this.update(result.id, {
      job: job.id,
    });

    return result;
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
      job: updateRssOriginDto.job,

      data: updateRssOriginDto.data,

      url: updateRssOriginDto.url,
    });
  }

  async remove(id: RssOrigin['id']) {
    const result = await this.findById(id);
    if (result?.job) {
      await this.rssOriginQueue.removeJobScheduler(result.job);
    }
    return this.rssOriginRepository.remove(id);
  }
}
