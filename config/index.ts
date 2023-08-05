import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { Configuration } from './types';
import { validateSync } from 'class-validator';

const YAML_CONFIG_FILENAME = 'config.yaml';

function configLoader(): Record<string, any> {
  return yaml.load(readFileSync(join(YAML_CONFIG_FILENAME), 'utf8')) as Record<string, any> ;
}

function configValidator(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(Configuration, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export default {
  load: [configLoader],
  validate: configValidator,
  isGlobal: true,
  ignoreEnvVars: true,
  ignoreEnvFile: true,
  expandVariables: true,
} as ConfigModuleOptions;
