import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '100mb' }));
  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('Certificates Manager')
    .setDescription('Service to generate certificates')
    .setVersion('1.0')
    .addTag('certificates')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('certificates/swagger', app, document);

  await app.listen(3000);
}
bootstrap();
