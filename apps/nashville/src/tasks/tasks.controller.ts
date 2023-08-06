import { Body, Controller, NotFoundException, Param, Query, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Task } from './entities/task.entity';
import { ApiTags } from '@nestjs/swagger';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import {
  ApiCreateTask,
  ApiFindAllTasks,
  ApiFindOneTask,
  ApiRemoveTask,
  ApiUpdateTask,
} from './decorators/tasks-controller.api.decorators';

@ApiTags('tasks')
@UseInterceptors(GrpcToHttpInterceptor)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiCreateTask()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @ApiFindAllTasks()
  findAll(@Query() paginationDto: PaginationDto): Promise<Task[]> {
    return this.tasksService.findAll(paginationDto.page, paginationDto.limit);
  }

  @ApiFindOneTask(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  @ApiUpdateTask(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiRemoveTask(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.tasksService.remove(id);
  }
}
