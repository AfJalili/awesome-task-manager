import { NestFactory } from "@nestjs/core";
import { NashvilleModule } from "./nashville.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpStatus, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(NashvilleModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    })
  );

  const documentOptions = new DocumentBuilder()
    .setTitle"Awesome Task Manager"')
    .setDescription"The Awesome Task Manager Project APIs Specs."')
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('docs/api/v1', app, document);

  await app.listen(3000);
}

bootstrap();
