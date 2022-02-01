import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from './app.controller';
import { CertificateType } from './entities/certificates-type.entity';
import { CertificateTemplate } from './entities/certificate-template.entity';
import { CertificateTemplateParams } from './entities/certificate-template-params.entity';
import { CertificatesTypeRepository } from './repositories/certificates-type.repository';
import { CertificateTemplateRepository } from './repositories/certificate-template.repository';
import { CertificateTemplateParamsRepository } from './repositories/certificate-template-params.repository';
import { CertificatesService } from './certificates.service';
import { AppService } from './app.service';

@Module({
    imports: [TypeOrmModule.forFeature([CertificateType, CertificateTemplate, CertificateTemplateParams, CertificatesTypeRepository, CertificateTemplateRepository, CertificateTemplateParamsRepository])],
    controllers: [AppController],
    providers: [
        CertificatesService,
        AppService
    ],
})
export class CertificatesModule implements OnModuleInit {
    constructor(private readonly service: CertificatesService) { 

    }
    onModuleInit() {
        this.service.seedTypes()
    }
}