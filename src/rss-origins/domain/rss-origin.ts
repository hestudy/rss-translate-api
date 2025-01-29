import { ApiProperty } from '@nestjs/swagger';

export class RssOrigin {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  data?: string | null;

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
