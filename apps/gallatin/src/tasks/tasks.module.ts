import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import databaseConfig from '../../../../config/database';
import { Task } from './entities/task.entity';

@Module({
  // todo: fix issue of loading asyncOptions
  imports: [TypeOrmModule.forRootAsync(databaseConfig), TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
