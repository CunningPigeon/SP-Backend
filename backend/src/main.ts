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
  console.log('Login: http://localhost:3000/token'); 
  console.log('Full: http://localhost:3000/full'); // 
  console.log('Frame: http://localhost:3000/frame');
  console.log('Facade: http://localhost:3000/facade');
  console.log('Module: http://localhost:3000/module');
}
bootstrap();