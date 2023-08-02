import {ApiProperty} from '@nestjs/swagger';
import {PartialType} from '@nestjs/mapped-types';
import {CreateTaskDto} from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty({description: 'The unique identifier of the parent task.', required: false})
    parentId?: string | null = null;

    @ApiProperty({description: 'The title of the task.', required: false})
    title?: string;

    @ApiProperty({description: 'The description of the task.', required: false})
    description?: string;
}

