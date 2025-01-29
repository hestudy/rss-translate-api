// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRssOriginDto } from './create-rss-origin.dto';

export class UpdateRssOriginDto extends PartialType(CreateRssOriginDto) {}
