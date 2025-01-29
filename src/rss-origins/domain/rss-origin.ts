import { ApiProperty } from '@nestjs/swagger';

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
  data?: object | null;

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
