import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    type: 'string(uuid)',
    description: 'The uuid of the parent task. Set to null for root task.',
    required: false,
  })
  @IsUUID(4)
  @IsOptional()
  parentId?: string | null = null;

  @ApiProperty({ description: 'The title of the task.' })
  title: string;

  @ApiProperty({ description: 'The description of the task.' })
  description: string;
}
