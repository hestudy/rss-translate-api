import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RssItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
