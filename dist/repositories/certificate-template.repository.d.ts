import { CertificatesDTO } from "src/dtos/certificates.dto";
import { CertificateTemplate } from "src/entities/certificate-template.entity";
import { Repository } from "typeorm";
export declare class CertificateTemplateRepository extends Repository<CertificateTemplate> {
    add(dto: CertificatesDTO): Promise<CertificateTemplate>;
    findByTypeId(id: string): Promise<CertificateTemplate>;
    findById(id: string): Promise<CertificateTemplate>;
}
