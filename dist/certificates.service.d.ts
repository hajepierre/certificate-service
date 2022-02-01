import { CertificateTypeDTO } from "./dtos/certificates-type.dto";
import { CreateCertificateTemplateDTO } from "./dtos/create-certificate-template.dto";
import { CertificateTemplateParamsRepository } from "./repositories/certificate-template-params.repository";
import { CertificateTemplateRepository } from "./repositories/certificate-template.repository";
import { CertificatesTypeRepository } from "./repositories/certificates-type.repository";
import { ResponseDTO } from "./dtos/response.dto";
import { CertificatesTypeDTO } from "./dtos/certificate-type.dto";
export declare class CertificatesService {
    private readonly certificateTemplateParamsRepository;
    private readonly certificatesTypeRepository;
    private readonly certificateTemplateRepository;
    constructor(certificateTemplateParamsRepository: CertificateTemplateParamsRepository, certificatesTypeRepository: CertificatesTypeRepository, certificateTemplateRepository: CertificateTemplateRepository);
    seedTypes(): Promise<void>;
    getCertificateTypes(): Promise<CertificatesTypeDTO[]>;
    getCertificateByTypeName(name: string): Promise<import("./entities/certificate-template.entity").CertificateTemplate>;
    getTemplateParamsById(id: string): Promise<import("./entities/certificate-template-params.entity").CertificateTemplateParams>;
    addCertificateType(dto: CertificateTypeDTO): Promise<CertificatesTypeDTO>;
    configureTemplate(dto: CreateCertificateTemplateDTO): Promise<ResponseDTO>;
    private decodeAndSave;
}
