"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const certificate_template_params_repository_1 = require("./repositories/certificate-template-params.repository");
const certificate_template_repository_1 = require("./repositories/certificate-template.repository");
const certificates_type_repository_1 = require("./repositories/certificates-type.repository");
const fs = require("fs");
let CertificatesService = class CertificatesService {
    constructor(certificateTemplateParamsRepository, certificatesTypeRepository, certificateTemplateRepository) {
        this.certificateTemplateParamsRepository = certificateTemplateParamsRepository;
        this.certificatesTypeRepository = certificatesTypeRepository;
        this.certificateTemplateRepository = certificateTemplateRepository;
    }
    async seedTypes() {
        const types = [];
        types.push({
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
        });
        types.push({
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
        });
        types.push({
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
        });
        types.push({
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
        });
        types.push({
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
        });
        types.push({
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
        });
        for (const t of types) {
            await this.certificatesTypeRepository.add(t);
        }
    }
    async getCertificateTypes() {
        const data = await this.certificatesTypeRepository.find();
        const response = data.map(d => {
            return { id: d.id, name: d.name, description: d.description, params: d.params };
        });
        return response;
    }
    async getCertificateByTypeName(name) {
        const type = await this.certificatesTypeRepository.findByName(name);
        if (type) {
            return this.certificateTemplateRepository.findByTypeId(type.id);
        }
        return null;
    }
    async getTemplateParamsById(id) {
        const template = await this.certificateTemplateRepository.findById(id);
        if (template) {
            return this.certificateTemplateParamsRepository.findByCertificateId(id);
        }
        return null;
    }
    async addCertificateType(dto) {
        const { id, name, description, params } = await this.certificatesTypeRepository.add(dto);
        return { id, name, description, params };
    }
    async configureTemplate(dto) {
        const resp = {
            code: 401,
            status: 'FAILED',
            description: ''
        };
        const type = await this.certificatesTypeRepository.findById(dto.typeId);
        if (type) {
            await this.decodeAndSave(dto.file.fileText, dto.file.name);
            const templateDto = {
                typeId: dto.typeId,
                fileName: dto.file.name
            };
            const template = await this.certificateTemplateRepository.add(templateDto);
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
                    };
                    await this.certificateTemplateParamsRepository.add(param);
                }
                resp.code = 200;
                resp.status = "SUCCESS";
                resp.description = "Template configured successfully";
                return resp;
            }
            else {
                resp.description = "Unable to record template";
            }
        }
        resp.description = 'Uknown certificate type id';
        return resp;
    }
    decodeAndSave(base64str, fileName) {
        var bitmap = Buffer.from(base64str, 'base64');
        fs.writeFileSync(fileName, bitmap);
        console.log('******** File created from base64 encoded string ********');
    }
};
CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [certificate_template_params_repository_1.CertificateTemplateParamsRepository,
        certificates_type_repository_1.CertificatesTypeRepository,
        certificate_template_repository_1.CertificateTemplateRepository])
], CertificatesService);
exports.CertificatesService = CertificatesService;
//# sourceMappingURL=certificates.service.js.map