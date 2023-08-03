import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TasksModule } from './tasks/tasks.module';
import { join } from 'path';
import { TASK_PACKAGE_NAME } from './proto/tasks';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TasksModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, './proto/tasks.proto'),
      package: TASK_PACKAGE_NAME,
    },
  });

  await app.listen();
}

bootstrap();
