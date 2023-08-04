import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Task } from './entities/task.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: Task })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks by pagination' })
  @ApiResponse({ status: 200, description: 'Returned all tasks by pagination.', type: [Task] })
  findAll(@Query() paginationDto: PaginationDto): Promise<Task[]> {
    return this.tasksService.findAll(paginationDto.page, paginationDto.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Returned the task.', type: Task })
  async findOne(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: Task })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'The task has been successfully deleted.' })
  remove(@Param('id') id: string): void {
    this.tasksService.remove(id);
  }
}
