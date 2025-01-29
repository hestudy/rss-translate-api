import {
  IsObject,
  IsOptional,
  // decorators here
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateRssOriginDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  job?: string | null;

  @ApiProperty({
    required: false,
    type: () => Object,
  })
  @IsOptional()
  @IsObject()
  data?: object | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  url: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
