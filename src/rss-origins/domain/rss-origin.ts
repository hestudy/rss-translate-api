import { ApiProperty } from '@nestjs/swagger';
import { RssItem } from '../../rss-items/domain/rss-item';

export class RssOrigin {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  job?: string | null;

  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  data?: any | null;

  @ApiProperty({
    type: () => Array,
    nullable: true,
  })
  items?: RssItem[];

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  url: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
