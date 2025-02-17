import { RssOrigin } from '../../../../domain/rss-origin';

import { RssOriginEntity } from '../entities/rss-origin.entity';

export class RssOriginMapper {
  static toDomain(raw: RssOriginEntity): RssOrigin {
    const domainEntity = new RssOrigin();
    domainEntity.job = raw.job;

    domainEntity.data = raw.data;
    domainEntity.items = raw.items;

    domainEntity.url = raw.url;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: RssOrigin): RssOriginEntity {
    const persistenceEntity = new RssOriginEntity();
    persistenceEntity.job = domainEntity.job;

    persistenceEntity.data = domainEntity.data;

    persistenceEntity.url = domainEntity.url;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
