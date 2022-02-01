import { CertificateTypeDTO } from "src/dtos/certificates-type.dto";
import { CertificateType } from "src/entities/certificates-type.entity";
import { Repository } from "typeorm";
export declare class CertificatesTypeRepository extends Repository<CertificateType> {
    add(dto: CertificateTypeDTO): Promise<CertificateType>;
    findByName(name: string): Promise<CertificateType>;
    findById(id: string): Promise<CertificateType>;
}
