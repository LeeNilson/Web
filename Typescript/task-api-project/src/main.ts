import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades fora do DTO
    forbidNonWhitelisted: true, // Retorna erro p/ extras
    transform: true,       // Converte tipos 
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
