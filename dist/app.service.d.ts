import { CertificateTemplateParams } from './entities/certificate-template-params.entity';
export declare class AppService {
    color: string;
    fontSize: number;
    generateCertificate(templateFileName: string, params: CertificateTemplateParams[], dto: any): Promise<unknown>;
    generateQR(docNumber: string): any;
    private fileToBase64;
    private decodeAndSave;
}
