import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

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
  await app.listen(process.env.PORT ?? 3000);
}

// void tells that i know its a promise and i dont care about the return value otherwise we get Eslint erroe
void bootstrap();
