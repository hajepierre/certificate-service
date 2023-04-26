import { CertificatesParamDTO } from "src/dtos/certificates-param.dto";
import { CertificateTemplateParams } from "src/entities/certificate-template-params.entity";
import { Repository } from "typeorm";
export declare class CertificateTemplateParamsRepository extends Repository<CertificateTemplateParams> {
    add(dto: CertificatesParamDTO): Promise<CertificateTemplateParams>;
    findByTemplateId(id: string): Promise<CertificateTemplateParams[]>;
    findByTemplateIdAndParamName(id: string, name: string): Promise<CertificateTemplateParams>;
    findById(id: string): Promise<CertificateTemplateParams>;
}
