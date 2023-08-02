import {NestFactory} from '@nestjs/core';
import {NashvilleModule} from './nashville.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(NashvilleModule);

  const config = new DocumentBuilder()
      .setTitle('Awesome Task Manager')
      .setDescription('The Awesome Task Manager Project APIs Specs.')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api/v1', app, document);

  await app.listen(3000);
}
bootstrap();
