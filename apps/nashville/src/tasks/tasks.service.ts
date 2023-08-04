import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import {
  Empty,
  ListTasksResponse,
  TASK_PACKAGE_NAME,
  TASKS_SERVICE_NAME,
  TasksServiceClient,
} from '@gallatin/interfaces/grpc';
import { ClientGrpc } from '@nestjs/microservices';
import { ObservableToPromise } from '../utils/observable-to-promise';

@Injectable()
export class TasksService implements OnModuleInit {
  private tasksClient: TasksServiceClient;

  constructor(@Inject(TASK_PACKAGE_NAME) private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.tasksClient = this.clientGrpc.getService<TasksServiceClient>(TASKS_SERVICE_NAME);
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return ObservableToPromise<Task>(this.tasksClient.createTask(createTaskDto), (task: Task) => task);
  }

  async findAll(page: number, limit: number): Promise<Task[]> {
    return ObservableToPromise<Task[], ListTasksResponse>(
      this.tasksClient.listTasks({ page, limit }),
      (list: ListTasksResponse) => list.tasks
    );
  }

  findOne(id: string): Promise<Task> {
    return ObservableToPromise<Task>(this.tasksClient.readTask({ id }), (task: Task) => task);
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return ObservableToPromise<Task>(this.tasksClient.updateTask({ id, ...updateTaskDto }), (task: Task) => task);
  }

  remove(id: string): Promise<void> {
    return ObservableToPromise<void, Empty>(this.tasksClient.deleteTask({ id }));
  }
}
