import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  ListTasksRequest,
  ReadTaskRequest,
  UpdateTaskRequest,
} from '@gallatin/interfaces/grpc';

@Injectable()
export class TasksService {
  createTask(request: CreateTaskRequest): Promise<Task> {
    return undefined;
  }

  listTasks(request: ListTasksRequest): Promise<Task[]> {
    return undefined;
  }

  readTask(request: ReadTaskRequest): Promise<Task> {
    return undefined;
  }

  updateTask(request: UpdateTaskRequest): Promise<Task> {
    return undefined;
  }

  deleteTask(request: DeleteTaskRequest): Promise<Task> {
    return undefined;
  }
}
