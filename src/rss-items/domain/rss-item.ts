import { RssOrigin } from '../../rss-origins/domain/rss-origin';
import { ApiProperty } from '@nestjs/swagger';

export class RssItem {
  @ApiProperty({
    type: () => RssOrigin,
    nullable: false,
  })
  rssOrigin: RssOrigin;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  data: string;

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
  data: string;

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
