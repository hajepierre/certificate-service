import { Base } from "./base";
import { CertificateTemplateParams } from "./certificate-template-params.entity";
import { CertificateType } from "./certificates-type.entity";
export declare class CertificateTemplate extends Base {
    type: CertificateType;
    fileName: string;
    params: CertificateTemplateParams[];
}
