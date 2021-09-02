import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getFirmCertificates(res: any, companyName: string, registrationNumber: string, councilMeetingDate: string, expiryDate: string, displine: string, signatureDate: string): void;
    generateIndividualCertificates(res: any, year: string, fullName: string, membershipClassName: string, registrationNumber: string, displine: string, expiryDate: string, signatureDate: string): void;
    generateGraduatesCertificates(res: any, year: string, fullName: string, membershipClassName: string, displine: string, signatureDate: string): void;
}
