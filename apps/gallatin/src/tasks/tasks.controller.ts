import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  ListTasksRequest,
  ListTasksResponse,
  ReadTaskRequest,
  Task,
  TASKS_SERVICE_NAME,
  UpdateTaskRequest,
} from '@gallatin/interfaces/grpc/tasks';
import { GrpcInvalidArgumentException, GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod(TASKS_SERVICE_NAME)
  async createTask(request: CreateTaskRequest): Promise<Task> {
    return await this.tasksService.createTask(request);
  }

  @GrpcMethod(TASKS_SERVICE_NAME)
  async readTask(request: ReadTaskRequest): Promise<Task> {
    const task = await this.tasksService.readTask(request.id);
    if (!task) {
      throw new GrpcNotFoundException('Task Not Found.');
    }
    return task;
  }

  @GrpcMethod(TASKS_SERVICE_NAME)
  async listTasks(request: ListTasksRequest): Promise<ListTasksResponse> {
    if (request.page < 1 || request.limit < 1) {
      throw new GrpcInvalidArgumentException('page and limit must be positive integer!');
    }
    return { tasks: await this.tasksService.listTasks(request) };
  }

  @GrpcMethod(TASKS_SERVICE_NAME)
  async updateTask(request: UpdateTaskRequest): Promise<Task> {
    return await this.tasksService.updateTask(request).then(() => this.readTask({ id: request.id }));
  }

  @GrpcMethod(TASKS_SERVICE_NAME)
  async deleteTask(request: DeleteTaskRequest): Promise<void> {
    await this.readTask(request);
    await this.tasksService.deleteTask(request.id);
  }
}
