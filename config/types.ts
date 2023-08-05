import { IsPort, IsString, ValidateNested } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class HttpConfig {
  @IsString()
  host: string;

  @IsPort()
  port: string;
}

export class DatabaseConfig {
  @IsString()
  type: string;

  @IsString()
  host: string;

  @IsPort()
  port: string;

  @IsString()
  user: string;

  @IsString()
  password: string;

  @IsString()
  database: string;

  @IsString()
  schema: string;
}

export class NashvilleConfig {
  @ValidateNested()
  http: HttpConfig;
}

export class GallatinConfig {
  @ValidateNested()
  database: DatabaseConfig;
}

export class Configuration {
  environment: Environment;

  @ValidateNested()
  nashville: NashvilleConfig;

  @ValidateNested()
  gallatin: GallatinConfig;
}
