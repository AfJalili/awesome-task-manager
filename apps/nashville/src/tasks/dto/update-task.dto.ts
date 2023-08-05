import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    type: 'string(uuid)',
    description: 'The uuid of the parent task. Set to null for root task.',
    required: false,
  })
  @IsUUID(4)
  @IsOptional()
  parentId?: string | null = null;

  @ApiProperty({ description: 'The title of the task.', required: false })
  title?: string;

  @ApiProperty({ description: 'The description of the task.', required: false })
  description?: string;
}
