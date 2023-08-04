import { Inject, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TASK_PACKAGE_NAME, TASKS_SERVICE_NAME, TasksServiceClient } from '@gallatin/interfaces/grpc';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TasksService implements OnModuleInit {
  private tasksClient: TasksServiceClient;

  constructor(@Inject(TASK_PACKAGE_NAME) private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.tasksClient = this.clientGrpc.getService<TasksServiceClient>(TASKS_SERVICE_NAME);
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await new Promise<Task>((resolve, reject) => {
      this.tasksClient.createTask(createTaskDto).subscribe({
        next: task => {
          resolve(task);
        },
        error: err => {
          console.error('Observer got an error: ', err);
          reject(new InternalServerErrorException(err.message));
        },
      });
    });
  }

  async findAll(page: number, limit: number): Promise<Task[]> {
    return new Promise<Task[]>((resolve, reject) => {
      this.tasksClient.listTasks({ page, limit }).subscribe({
        next: list => resolve(list.tasks),
        error: err => {
          console.error('Observer got an error: ' + err);
          reject(new InternalServerErrorException(err.message));
        },
      });
    });
  }

  findOne(id: string): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
      this.tasksClient.readTask({ id }).subscribe({
        next: task => resolve(task),
        error: err => {
          console.error('Observer got an error: ' + err);
          reject(new InternalServerErrorException(err.message));
        },
      });
    });
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
      this.tasksClient.updateTask({ id, ...updateTaskDto }).subscribe({
        next: task => resolve(task),
        error: err => {
          console.error('Observer got an error: ' + err);
          reject(new InternalServerErrorException(err.message));
        },
      });
    });
  }

  remove(id: string): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
      this.tasksClient.deleteTask({ id }).subscribe({
        next: task => resolve(task),
        error: err => {
          console.error('Observer got an error: ' + err);
          reject(new InternalServerErrorException(err.message));
        },
      });
    });
  }
}
