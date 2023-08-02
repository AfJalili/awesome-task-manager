import {ApiProperty} from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({description: 'The unique identifier of the parent task.', required: false})
    parentId?: string | null = null;

    @ApiProperty({description: 'The title of the task.'})
    title: string;

    @ApiProperty({description: 'The description of the task.'})
    description: string;
}
