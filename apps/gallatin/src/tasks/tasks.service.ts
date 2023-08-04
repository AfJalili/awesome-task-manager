import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  ListTasksRequest,
  ReadTaskRequest,
  UpdateTaskRequest,
} from '@gallatin/interfaces/grpc';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>
  ) {}

  async createTask(request: CreateTaskRequest): Promise<Task> {
    const task = this.taskRepo.create(request);
    return this.taskRepo.insert(task).then(() => task);
  }

  listTasks(request: ListTasksRequest): Promise<Task[]> {
    return this.taskRepo.find({ take: request.limit, skip: (request.page - 1) * request.limit });
  }

  readTask(request: ReadTaskRequest): Promise<Task> {
    return this.taskRepo.findOneBy(request);
  }

  updateTask(request: UpdateTaskRequest): Promise<Task> {
    const task = this.taskRepo.create(request);
    return this.taskRepo.update({ id: request.id }, task).then(() => task);
  }

  async deleteTask(request: DeleteTaskRequest): Promise<Task> {
    const task = this.readTask(request);
    if (task) {
      await this.taskRepo.delete({ id: request.id });
      return await task;
    }
    return null;
  }
}
