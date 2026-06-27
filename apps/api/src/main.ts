import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ⭐ IMPORTANT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐⭐ CRITICAL LINE — ENABLE VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // ⭐ converts types automatically
    }),
  );

  await app.listen(3001);
  console.log(`✅ API running at http://localhost:3001`);
}

bootstrap();