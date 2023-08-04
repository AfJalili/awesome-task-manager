/* eslint-disable */
import { Observable } from "rxjs";

export const protobufPackage = 'task';

export interface CreateTaskRequest {
  parentId?: string | undefined;
  title: string;
  description: string;
}

export interface ReadTaskRequest {
  id: string;
}

export interface UpdateTaskRequest {
  id: string;
  parentId?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
}

export interface DeleteTaskRequest {
  id: string;
}

export interface ListTasksRequest {
  page: number;
  limit: number;
}

export interface ListTasksResponse {
  tasks: Task[];
}

export interface Task {
  id: string;
  parentId?: string | undefined;
  title: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Empty {}

export const TASK_PACKAGE_NAME = 'task';

export interface TasksServiceClient {
  createTask(request: CreateTaskRequest): Observable<Task>;

  readTask(request: ReadTaskRequest): Observable<Task>;

  updateTask(request: UpdateTaskRequest): Observable<Task>;

  deleteTask(request: DeleteTaskRequest): Observable<Empty>;

  listTasks(request: ListTasksRequest): Observable<ListTasksResponse>;
}

export interface TasksServiceController {
  createTask(request: CreateTaskRequest): Promise<Task> | Observable<Task> | Task;

  readTask(request: ReadTaskRequest): Promise<Task> | Observable<Task> | Task;

  updateTask(request: UpdateTaskRequest): Promise<Task> | Observable<Task> | Task;

  deleteTask(request: DeleteTaskRequest): Promise<Empty> | Observable<Empty> | Empty;

  listTasks(request: ListTasksRequest): Promise<ListTasksResponse> | Observable<ListTasksResponse> | ListTasksResponse;
}

export const TASKS_SERVICE_NAME = 'TasksService';
