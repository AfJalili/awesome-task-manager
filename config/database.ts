import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './types';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export default {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    const dbConfig = configService.get<DatabaseConfig>('gallatin.database');
    return {
      type: 'postgres',
      host: dbConfig.host,
      port: Number(dbConfig.port),
      username: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      synchronize: true,
      autoLoadEntities: true,
    };
  },
} as TypeOrmModuleAsyncOptions;
