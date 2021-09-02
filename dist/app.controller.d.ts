import { AppService } from './app.service';
import { FirmCertificate } from './dtos/firm-certificate.dto';
import { GraduateCertificate } from './dtos/graduate-certificate.dto';
import { IndividualCertificate } from './dtos/individual-certificates.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    generateFirmCertificates(res: any, dto: FirmCertificate): void;
    generateIndividualCertificates(res: any, dto: IndividualCertificate): void;
    generateGraduatesCertificates(res: any, dto: GraduateCertificate): void;
}
