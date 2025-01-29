import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RssItem } from '../../domain/rss-item';

export abstract class RssItemRepository {
  abstract create(
    data: Omit<RssItem, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RssItem>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RssItem[]>;

  abstract findById(id: RssItem['id']): Promise<NullableType<RssItem>>;

  abstract findByIds(ids: RssItem['id'][]): Promise<RssItem[]>;

  abstract update(
    id: RssItem['id'],
    payload: DeepPartial<RssItem>,
  ): Promise<RssItem | null>;

  abstract remove(id: RssItem['id']): Promise<void>;

  abstract countByUrlAndRssOrigin(
    url: RssItem['url'],
    rssOrigin: RssItem['rssOrigin']['id'],
  ): Promise<number>;
}
