import { Base } from "./base";
import { CertificateTemplate } from "./certificate-template.entity";
export declare class CertificateTemplateParams extends Base {
    template: CertificateTemplate;
    paramName: string;
    xCoordinate: number;
    yCoordinate: number;
    color: string;
    font: string;
    width: number;
    breadth: number;
}
