import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return Promise.resolve(new Task());
  }

  findAll(page: number, limit: number): Promise<Task[]> {
    return Promise.resolve([new Task()]);
  }

  findOne(id: number): Promise<Task> {
    return Promise.resolve(new Task());
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return Promise.resolve(new Task());
  }

  remove(id: number): Promise<Task> {
    return Promise.resolve(new Task());
  }
}
