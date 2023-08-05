import { NestFactory } from '@nestjs/core';
import { NashvilleModule } from './nashville.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpConfig } from '../../../config/types';

async function bootstrap() {
  const app = await NestFactory.create(NashvilleModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    })
  );
  app.enableShutdownHooks();
  app.setGlobalPrefix('api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const documentOptions = new DocumentBuilder()
    .setTitle('Awesome Task Manager')
    .setDescription('The Awesome Task Manager Project APIs Specs.')
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('docs/api/v1', app, document);

  const httpConfig = app.get(ConfigService).get<HttpConfig>('nashville.http');
  await app.listen(httpConfig.port);
}

bootstrap();
