import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RssOriginEntity } from '../entities/rss-origin.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { RssOrigin } from '../../../../domain/rss-origin';
import { RssOriginRepository } from '../../rss-origin.repository';
import { RssOriginMapper } from '../mappers/rss-origin.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RssOriginRelationalRepository implements RssOriginRepository {
  constructor(
    @InjectRepository(RssOriginEntity)
    private readonly rssOriginRepository: Repository<RssOriginEntity>,
  ) {}

  async create(data: RssOrigin): Promise<RssOrigin> {
    const persistenceModel = RssOriginMapper.toPersistence(data);
    const newEntity = await this.rssOriginRepository.save(
      this.rssOriginRepository.create(persistenceModel),
    );
    return RssOriginMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RssOrigin[]> {
    const entities = await this.rssOriginRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => RssOriginMapper.toDomain(entity));
  }

  async findById(id: RssOrigin['id']): Promise<NullableType<RssOrigin>> {
    const entity = await this.rssOriginRepository.findOne({
      where: { id },
    });

    return entity ? RssOriginMapper.toDomain(entity) : null;
  }

  async findByIds(ids: RssOrigin['id'][]): Promise<RssOrigin[]> {
    const entities = await this.rssOriginRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => RssOriginMapper.toDomain(entity));
  }

  async update(
    id: RssOrigin['id'],
    payload: Partial<RssOrigin>,
  ): Promise<RssOrigin> {
    const entity = await this.rssOriginRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.rssOriginRepository.save(
      this.rssOriginRepository.create(
        RssOriginMapper.toPersistence({
          ...RssOriginMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RssOriginMapper.toDomain(updatedEntity);
  }

  async remove(id: RssOrigin['id']): Promise<void> {
    await this.rssOriginRepository.delete(id);
  }
}
