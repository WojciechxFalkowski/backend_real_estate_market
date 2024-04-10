import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableCors();

  // Validation pipe -> https://docs.nestjs.com/pipes#object-schema-validation
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger -> https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('Real estate market API')
    .setDescription('Opis')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3101);
}
bootstrap();
