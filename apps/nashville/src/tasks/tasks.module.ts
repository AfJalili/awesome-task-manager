import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TASK_PACKAGE_NAME } from '@gallatin/interfaces/grpc';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TASK_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: TASK_PACKAGE_NAME,
          protoPath: 'proto/tasks.proto',
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
