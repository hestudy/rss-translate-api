import { RssOrigin } from '../../rss-origins/domain/rss-origin';
import { ApiProperty } from '@nestjs/swagger';

export class RssItem {
  @ApiProperty({
    type: () => RssOrigin,
    nullable: false,
  })
  rssOrigin: RssOrigin;

  @ApiProperty({
    type: () => Object,
    nullable: false,
  })
  data: object;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  content?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  title?: string | null;

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
