import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './types';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export default {
  inject: [ConfigService],
  userFactory: async (configService: ConfigService) => {
    const dbConfig = configService.get<DatabaseConfig>('database');
    return {
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      synchronize: false,
      debug: false,
      autoLoadEntities: true,
    };
  },
} as TypeOrmModuleAsyncOptions;
