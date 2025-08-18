import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Разрешаем запросы с фронтенда
  // app.enableCors({
  //   origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });

  await app.listen(3000);
  console.log('Root: http://localhost:3000');
  console.log('External: http://localhost:3000/external'); // 
  console.log('Frame: http://localhost:3000/frames/options');
}
bootstrap();