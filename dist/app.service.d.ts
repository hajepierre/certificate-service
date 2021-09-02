import { FirmCertificate } from './dtos/firm-certificate.dto';
import { IndividualCertificate } from './dtos/individual-certificates.dto';
import { GraduateCertificate } from './dtos/graduate-certificate.dto';
export declare class AppService {
    color: string;
    generatePracticingIndividualCertificate(dto: IndividualCertificate): Promise<unknown>;
    generatePracticingFirmCertificate(dto: FirmCertificate): Promise<unknown>;
    generateNonPracticingCertificate(dto: GraduateCertificate): Promise<unknown>;
}
