import { applyDecorators, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

export function ApiCreateTask(path?: string | string[]) {
  return applyDecorators(
    Post(path),
    ApiOperation({ summary: 'Create a new task' }),
    ApiBody({ type: CreateTaskDto }),
    ApiResponse({ status: 201, description: 'The task has been successfully created.', type: Task })
  );
}

export function ApiFindAllTasks(path?: string | string[]) {
  return applyDecorators(
    Get(path),
    ApiOperation({ summary: 'Retrieve all tasks by pagination' }),
    ApiResponse({ status: 200, description: 'Returned all tasks by pagination.', type: [Task] })
  );
}

export function ApiFindOneTask(path?: string | string[]) {
  return applyDecorators(
    Get(path),
    ApiOperation({ summary: 'Retrieve a task by id' }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 200, description: 'Returned the task.', type: Task })
  );
}

export function ApiUpdateTask(path?: string | string[]) {
  return applyDecorators(
    Patch(path),
    ApiOperation({ summary: 'Update a task by id' }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UpdateTaskDto }),
    ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: Task })
  );
}

export function ApiRemoveTask(path?: string | string[]) {
  return applyDecorators(
    Delete(path),
    ApiOperation({ summary: 'Delete a task by id' }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 204, description: 'The task has been successfully deleted.' })
  );
}
