import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import configModuleOptions from '../../../config/';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), TasksModule],
  controllers: [],
  providers: [],
})
export class NashvilleModule {}
