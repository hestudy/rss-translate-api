import { RssOriginDto } from '../../rss-origins/dto/rss-origin.dto';

import {
  IsNotEmptyObject,
  IsOptional,
  // decorators here
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateRssItemDto {
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
    type: () => String,
  })
  @IsString()
  data: string;

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
