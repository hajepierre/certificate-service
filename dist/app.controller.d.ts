import { AckResponseDTO } from './dtos/ack.dto';
import { AppService } from './app.service';
import { FileDTO } from './dtos/file.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getFirmCertificates(res: any, companyName: string, registrationNumber: string, councilMeetingDate: string, expiryDate: string, discipline: string, signatureDate: string, certificateNumber: string): void;
    generateIndividualCertificates(res: any, year: string, fullName: string, membershipClassName: string, registrationNumber: string, discipline: string, expiryDate: string, signatureDate: string, certificateNumber: string): Promise<void>;
    generateGraduatesCertificates(res: any, year: string, fullName: string, membershipClassName: string, discipline: string, signatureDate: string, certificateNumber: string): void;
    getTemplates(): Promise<FileDTO[]>;
    uploadTemplate(dto: FileDTO): Promise<AckResponseDTO>;
}
