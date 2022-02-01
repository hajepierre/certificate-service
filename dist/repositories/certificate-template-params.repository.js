"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateTemplateParamsRepository = void 0;
const certificates_param_dto_1 = require("../dtos/certificates-param.dto");
const certificate_template_params_entity_1 = require("../entities/certificate-template-params.entity");
const typeorm_1 = require("typeorm");
let CertificateTemplateParamsRepository = class CertificateTemplateParamsRepository extends typeorm_1.Repository {
    async add(dto) {
        const { templateId, paramName, xCoordinate, yCoordinate, color, font } = dto;
        const temp = await this.findByCertificateId(dto.templateId);
        if (temp) {
            const id = temp.id;
            const data = {
                paramName,
                xCoordinate,
                yCoordinate,
                color,
                font
            };
            await this.update({ id }, data);
            return await this.findById(id);
        }
        const entity = await this.create({
            template: { id: templateId },
            paramName,
            xCoordinate,
            yCoordinate,
            color,
            font
        });
        return await this.save(entity);
    }
    async findByCertificateId(id) {
        return await this.findOne({ where: { certificate: { id } }, order: { createdAt: 'DESC' } });
    }
    async findById(id) {
        return await this.findOne({ where: { id } });
    }
};
CertificateTemplateParamsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(certificate_template_params_entity_1.CertificateTemplateParams)
], CertificateTemplateParamsRepository);
exports.CertificateTemplateParamsRepository = CertificateTemplateParamsRepository;
//# sourceMappingURL=certificate-template-params.repository.js.map