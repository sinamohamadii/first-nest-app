import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { DocumentBuilder } from 'node_modules/@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from 'node_modules/@nestjs/swagger/dist/swagger-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // filters any properties that are not in the DTO
      whitelist: true,
      // throws an error if any properties that are not in the DTO are present
      forbidNonWhitelisted: true,
      // automatically transform payloads to be objects typed according to their DTO classes
      transform: true,
      // enables implicit type conversion for primitive types (e.g., string to number)
      // meaning that we no longer need to use @Type(() => Number) to explicitly define types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee API')
    .setDescription('The Iluvcoffee API description')
    .setVersion('1.0')
    .addTag('iluvcoffee')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

// void tells that i know its a promise and i dont care about the return value otherwise we get Eslint erroe
void bootstrap();
