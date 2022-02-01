import { CertificatesModule } from './certificates.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import { CertificateType } from './entities/certificates-type.entity';
import { CertificateTemplate } from './entities/certificate-template.entity';
import { CertificateTemplateParams } from './entities/certificate-template-params.entity';

// init dotenv
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        CertificateType,
        CertificateTemplate,
        CertificateTemplateParams
      ],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy()
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    CertificatesModule,
  ],
})
export class AppModule { }
