import { CertificatesService } from './certificates.service';
import { ResponseDTO } from './dtos/response.dto';
import { AppService } from './app.service';
import { CreateCertificateTemplateDTO } from './dtos/create-certificate-template.dto';
import { CertificatesTypeDTO } from './dtos/certificate-type.dto';
import { CertificateTypeDTO } from './dtos/certificates-type.dto';
export declare class AppController {
    private readonly appService;
    private readonly certificatesService;
    constructor(appService: AppService, certificatesService: CertificatesService);
    getCertificateTypes(): Promise<CertificatesTypeDTO[]>;
    addCertificateType(dto: CertificateTypeDTO): Promise<CertificatesTypeDTO>;
    configureTemplate(dto: CreateCertificateTemplateDTO): Promise<ResponseDTO>;
    generateCertificate(name: string, res: any, dto: any): Promise<unknown>;
}
