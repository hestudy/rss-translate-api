import { RssItem } from '../../../../domain/rss-item';

import { RssOriginMapper } from '../../../../../rss-origins/infrastructure/persistence/relational/mappers/rss-origin.mapper';

import { RssItemEntity } from '../entities/rss-item.entity';

export class RssItemMapper {
  static toDomain(raw: RssItemEntity): RssItem {
    const domainEntity = new RssItem();
    domainEntity.pubDate = raw.pubDate;

    if (raw.rssOrigin) {
      domainEntity.rssOrigin = RssOriginMapper.toDomain(raw.rssOrigin);
    }

    if (raw.rssOrigin) {
      domainEntity.rssOrigin = RssOriginMapper.toDomain(raw.rssOrigin);
    }

    domainEntity.data = raw.data;

    domainEntity.content = raw.content;

    domainEntity.title = raw.title;

    domainEntity.data = raw.data;

    domainEntity.url = raw.url;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: RssItem): RssItemEntity {
    const persistenceEntity = new RssItemEntity();
    persistenceEntity.pubDate = domainEntity.pubDate;

    if (domainEntity.rssOrigin) {
      persistenceEntity.rssOrigin = RssOriginMapper.toPersistence(
        domainEntity.rssOrigin,
      );
    }

    if (domainEntity.rssOrigin) {
      persistenceEntity.rssOrigin = RssOriginMapper.toPersistence(
        domainEntity.rssOrigin,
      );
    }

    persistenceEntity.data = domainEntity.data;

    persistenceEntity.content = domainEntity.content;

    persistenceEntity.title = domainEntity.title;

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
