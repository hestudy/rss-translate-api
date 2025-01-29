import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RssOriginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
