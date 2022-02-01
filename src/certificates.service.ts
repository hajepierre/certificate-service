import { Injectable } from "@nestjs/common";
import { CertificateTypeDTO } from "./dtos/certificates-type.dto";
import { CreateCertificateTemplateDTO } from "./dtos/create-certificate-template.dto";
import { CertificateTemplateParamsRepository } from "./repositories/certificate-template-params.repository";
import { CertificateTemplateRepository } from "./repositories/certificate-template.repository";
import { CertificatesTypeRepository } from "./repositories/certificates-type.repository";
import * as fs from 'fs';
import { CertificatesDTO } from "./dtos/certificates.dto";
import { ResponseDTO } from "./dtos/response.dto";
import { CertificatesTypeDTO } from "./dtos/certificate-type.dto";

@Injectable()
export class CertificatesService {

    constructor(
        private readonly certificateTemplateParamsRepository: CertificateTemplateParamsRepository,
        private readonly certificatesTypeRepository: CertificatesTypeRepository,
        private readonly certificateTemplateRepository: CertificateTemplateRepository
    ) { }

    async seedTypes() {

        const types: CertificateTypeDTO[] = []

        types.push(
            {
                name: 'firmCertificate',
                description: 'Practicing Certificate',
                params: {
                    year: '',
                    companyName: '',
                    registrationNumber: '',
                    councilMeetingDay: '',
                    councilMeetingMonth: '',
                    expiryDate: '',
                    discipline: '',
                    certificateNumber: '',
                    signatureDate: '',
                    qr: ''
                }
            }
        )
        types.push(
            {
                name: 'graduateEngineerMembershipCertificate',
                description: 'Graduate Engineer MEMBERSHIP Certificate',
                params: {
                    year: '',
                    fullName: '',
                    membershipClassName: '',
                    discipline: '',
                    signatureDay: '',
                    signatureMonth: '',
                    qr: ''
                }
            }
        )
        types.push(
            {
                name: 'graduateTechnologistRegistrationCertificate',
                description: 'Graduate TECHNOLOGIST REGISTRATION CERTIFICATE',
                params: {
                    year: '',
                    fullName: '',
                    membershipClassName: '',
                    discipline: '',
                    signatureDay: '',
                    signatureMonth: '',
                    qr: ''
                }
            }
        )
        types.push(
            {
                name: 'professionalEngineerCertificate',
                description: 'Professional Engineer Certificate',
                params: {
                    year: '',
                    fullName: '',
                    membershipClassName: '',
                    discipline: '',
                    certificateNumber: '',
                    signatureMonth: '',
                    photo: '',
                    expiryDate: '',
                    issuanceDate: '',
                    authorizedBy: '',
                    councilMeetingDay: '',
                    councilMeetingMonth: '',
                    qr: ''
                }
            }
        )
        types.push(
            {
                name: 'technicianCertificate',
                description: 'Technician Certificate',
                params: {
                    year: '',
                    fullName: '',
                    membershipClassName: '',
                    discipline: '',
                    certificateNumber: '',
                    councilMeetingDay: '',
                    councilMeetingMonth: '',
                    qr: ''
                }
            }
        )
        types.push(
            {
                name: 'technologistCertificate',
                description: 'Technologist Certificate',
                params: {
                    year: '',
                    fullName: '',
                    membershipClassName: '',
                    discipline: '',
                    certificateNumber: '',
                    councilMeetingDay: '',
                    councilMeetingMonth: '',
                    expiryDay: '',
                    expiryMonth: '',
                    expiryYear: '',
                    qr: ''
                }
            }
        )

        for (const t of types) {
            await this.certificatesTypeRepository.add(t)
        }
    }

    async getCertificateTypes(): Promise<CertificatesTypeDTO[]> {
        const data = await this.certificatesTypeRepository.find()
        const response: CertificatesTypeDTO[] = data.map(d => {
            return { id: d.id, name: d.name, description: d.description, params: d.params }
        })
        return response;

    }

    async getCertificateByTypeName(name: string) {
        const type = await this.certificatesTypeRepository.findByName(name)
        if (type) {
            return this.certificateTemplateRepository.findByTypeId(type.id)
        }
        return null;
    }

    async getTemplateParamsById(id: string) {
        const template = await this.certificateTemplateRepository.findById(id)
        if (template) {
            return this.certificateTemplateParamsRepository.findByCertificateId(id)
        }
        return null;
    }

    async addCertificateType(dto: CertificateTypeDTO): Promise<CertificatesTypeDTO> {
        const { id, name, description, params } = await this.certificatesTypeRepository.add(dto)
        return { id, name, description, params }
    }

    async configureTemplate(dto: CreateCertificateTemplateDTO): Promise<ResponseDTO> {
        const resp: ResponseDTO = {
            code: 401,
            status: 'FAILED',
            description: ''
        }
        // begin by saving the file first
        const type = await this.certificatesTypeRepository.findById(dto.typeId);
        if (type) {
            await this.decodeAndSave(dto.file.fileText, dto.file.name);
            const templateDto: CertificatesDTO = {
                typeId: dto.typeId,
                fileName: dto.file.name
            }
            const template = await this.certificateTemplateRepository.add(templateDto)
            if (template) {
                for (const p of dto.params) {
                    const { paramName, xCoordinate, yCoordinate, color, font, width, breadth } = p;
                    const param = {
                        templateId: template.id,
                        paramName,
                        xCoordinate,
                        yCoordinate,
                        color,
                        font,
                        width,
                        breadth
                    }
                    await this.certificateTemplateParamsRepository.add(param)
                }
                resp.code = 200
                resp.status = "SUCCESS"
                resp.description = "Template configured successfully"
                return resp;
            } else {
                resp.description = "Unable to record template"
            }
        }
        resp.description = 'Uknown certificate type id'
        return resp
    }


    private decodeAndSave(base64str: string, fileName: string) {

        var bitmap = Buffer.from(base64str, 'base64');
        // write buffer to file
        fs.writeFileSync(fileName, bitmap);
        console.log('******** File created from base64 encoded string ********');
    }
}