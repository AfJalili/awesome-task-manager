import {ApiProperty} from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty({description: 'The current page number.'})
    page: number;

    @ApiProperty({description: 'The number of items per page.'})
    limit: number;
}
