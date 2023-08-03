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
  UpdateTaskRequest,
} from '@gallatin/interfaces/grpc/tasks';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod()
  createTask(request: CreateTaskRequest): Task {
    return undefined;
  }

  @GrpcMethod()
  deleteTask(request: DeleteTaskRequest): Task {
    return undefined;
  }

  @GrpcMethod()
  listTasks(request: ListTasksRequest): ListTasksResponse {
    return undefined;
  }

  @GrpcMethod()
  readTask(request: ReadTaskRequest): Task {
    return undefined;
  }

  @GrpcMethod()
  updateTask(request: UpdateTaskRequest): Task {
    return undefined;
  }
}
