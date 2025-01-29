import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RssOrigin } from '../../domain/rss-origin';

export abstract class RssOriginRepository {
  abstract create(
    data: Omit<RssOrigin, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RssOrigin>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RssOrigin[]>;

  abstract findById(id: RssOrigin['id']): Promise<NullableType<RssOrigin>>;

  abstract findByIds(ids: RssOrigin['id'][]): Promise<RssOrigin[]>;

  abstract update(
    id: RssOrigin['id'],
    payload: DeepPartial<RssOrigin>,
  ): Promise<RssOrigin | null>;

  abstract remove(id: RssOrigin['id']): Promise<void>;
}
