import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RssItemEntity } from '../entities/rss-item.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { RssItem } from '../../../../domain/rss-item';
import { RssItemRepository } from '../../rss-item.repository';
import { RssItemMapper } from '../mappers/rss-item.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RssItemRelationalRepository implements RssItemRepository {
  constructor(
    @InjectRepository(RssItemEntity)
    private readonly rssItemRepository: Repository<RssItemEntity>,
  ) {}

  async create(data: RssItem): Promise<RssItem> {
    const persistenceModel = RssItemMapper.toPersistence(data);
    const newEntity = await this.rssItemRepository.save(
      this.rssItemRepository.create(persistenceModel),
    );
    return RssItemMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RssItem[]> {
    const entities = await this.rssItemRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => RssItemMapper.toDomain(entity));
  }

  async findById(id: RssItem['id']): Promise<NullableType<RssItem>> {
    const entity = await this.rssItemRepository.findOne({
      where: { id },
    });

    return entity ? RssItemMapper.toDomain(entity) : null;
  }

  async findByIds(ids: RssItem['id'][]): Promise<RssItem[]> {
    const entities = await this.rssItemRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => RssItemMapper.toDomain(entity));
  }

  async update(id: RssItem['id'], payload: Partial<RssItem>): Promise<RssItem> {
    const entity = await this.rssItemRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.rssItemRepository.save(
      this.rssItemRepository.create(
        RssItemMapper.toPersistence({
          ...RssItemMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RssItemMapper.toDomain(updatedEntity);
  }

  async remove(id: RssItem['id']): Promise<void> {
    await this.rssItemRepository.delete(id);
  }

  async countByUrlAndRssOrigin(
    url: RssItem['url'],
    rssOrigin: RssItem['rssOrigin']['id'],
  ): Promise<number> {
    return await this.rssItemRepository.count({
      where: {
        url,
        rssOrigin: {
          id: rssOrigin,
        },
      },
    });
  }

  async findByRssOrigin(id: RssItem['rssOrigin']['id']): Promise<RssItem[]> {
    return await this.rssItemRepository.find({
      where: {
        rssOrigin: {
          id,
        },
      },
      take: 20,
      order: {
        pubDate: 'DESC',
      },
    });
  }
}
