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

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod(TASKS_SERVICE_NAME)
  async createTask(request: CreateTaskRequest): Promise<Task> {
    try {
      const task = await this.tasksService.createTask(request);
      console.log(task);
      return task;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  @GrpcMethod(TASKS_SERVICE_NAME)
  async readTask(request: ReadTaskRequest): Promise<Task> {
    return await this.tasksService.readTask(request);
  }

  @GrpcMethod(TASKS_SERVICE_NAME)
  async listTasks(request: ListTasksRequest): Promise<ListTasksResponse> {
    return { tasks: await this.tasksService.listTasks(request) };
  }

  @GrpcMethod(TASKS_SERVICE_NAME)
  async updateTask(request: UpdateTaskRequest): Promise<Task> {
    return await this.tasksService.updateTask(request);
  }

  @GrpcMethod(TASKS_SERVICE_NAME)
  async deleteTask(request: DeleteTaskRequest): Promise<Task> {
    return await this.tasksService.deleteTask(request);
  }
}
