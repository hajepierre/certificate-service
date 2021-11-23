import { FileDTO } from './dtos/file.dto';
import { FirmCertificate } from './dtos/firm-certificate.dto';
import { IndividualCertificate } from './dtos/individual-certificates.dto';
import { GraduateCertificate } from './dtos/graduate-certificate.dto';
import { AckResponseDTO } from './dtos/ack.dto';
export declare class AppService {
    color: string;
    templates: {
        individual: string;
        firm: string;
        graduate: string;
    };
    files: {
        name: string;
        membershipType: string;
    }[];
    generatePracticingIndividualCertificate(dto: IndividualCertificate): Promise<unknown>;
    generatePracticingFirmCertificate(dto: FirmCertificate): Promise<unknown>;
    generateNonPracticingCertificate(dto: GraduateCertificate): Promise<unknown>;
    generateQR(docNumber: string): any;
    getTemplates(): Promise<FileDTO[]>;
    getTemplate(name: string): Promise<FileDTO | AckResponseDTO>;
    uploadTemplate(dto: FileDTO): Promise<AckResponseDTO>;
    private fileToBase64;
    private decodeAndSave;
}
