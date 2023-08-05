import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskRequest, ListTasksRequest, UpdateTaskRequest } from '@gallatin/interfaces/grpc';
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

  readTask(id: string): Promise<Task> {
    return this.taskRepo.findOneBy({ id });
  }

  async updateTask(request: UpdateTaskRequest): Promise<Task> {
    const task = this.taskRepo.create(request);
    const updateResult = await this.taskRepo.update({ id: request.id }, task);
    if (updateResult.affected) {
      return this.readTask(request.id);
    }
    return null;
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepo.delete({ id });
  }
}
