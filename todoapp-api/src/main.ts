import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { VersioningType } from '@nestjs/common';

// Ce fichier est le point d'entrée principal de l'application.
// Il configure et démarre le serveur NestJS.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI, // Use URI versioning (e.g., /v1/tasks)
    defaultVersion: '1',
  });

  // Configure CORS to whitelist only the frontend UI
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Todo App API')
    .setDescription('API documentation for the Todo App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
