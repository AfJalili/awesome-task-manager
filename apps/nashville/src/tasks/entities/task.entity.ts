import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ description: 'The uuid of the task.' })
  id: string;

  @ApiProperty({ description: 'The uuid of the parent task.', required: false })
  parentId?: string | null = null;

  @ApiProperty({ description: 'The title of the task.' })
  title: string;

  @ApiProperty({ description: 'The description of the task.' })
  description: string;

  @ApiProperty({ description: 'The creation date of the task.' })
  createdAt: Date | string;

  @ApiProperty({ description: 'The last updated date of the task.' })
  updatedAt: Date | string;
}
