import { CertificatesService } from './certificates.service';
import { ResponseDTO } from './dtos/response.dto';
import { Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCertificateTemplateDTO } from './dtos/create-certificate-template.dto';
import { CertificatesTypeDTO } from './dtos/certificate-type.dto';
import { CertificateTypeDTO } from './dtos/certificates-type.dto';
export declare class AppController {
    private readonly appService;
    private readonly certificatesService;
    logger: Logger;
    constructor(appService: AppService, certificatesService: CertificatesService);
    getCertificateTypes(): Promise<CertificatesTypeDTO[]>;
    addCertificateType(dto: CertificateTypeDTO): Promise<CertificatesTypeDTO>;
    configureTemplate(dto: CreateCertificateTemplateDTO): Promise<ResponseDTO>;
    generateCertificate(dto: any, name: string, res: any): Promise<void>;
}
