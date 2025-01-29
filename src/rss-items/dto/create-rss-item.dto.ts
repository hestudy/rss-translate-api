import { RssOriginDto } from '../../rss-origins/dto/rss-origin.dto';

import {
  IsJSON,
  IsNotEmptyObject,
  IsOptional,
  // decorators here
  IsString,
  ValidateNested,
  IsDate,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

export class CreateRssItemDto {
  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  pubDate?: Date | null;

  @ApiProperty({
    required: true,
    type: () => RssOriginDto,
  })
  @ValidateNested()
  @Type(() => RssOriginDto)
  @IsNotEmptyObject()
  rssOrigin: RssOriginDto;

  @ApiProperty({
    required: true,
    type: () => Object,
  })
  @IsJSON()
  data: object;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  content?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  title?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  url: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
