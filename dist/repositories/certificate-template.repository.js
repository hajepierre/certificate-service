"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateTemplateRepository = void 0;
const certificates_dto_1 = require("../dtos/certificates.dto");
const certificate_template_entity_1 = require("../entities/certificate-template.entity");
const typeorm_1 = require("typeorm");
let CertificateTemplateRepository = class CertificateTemplateRepository extends typeorm_1.Repository {
    async add(dto) {
        const temp = await this.findByTypeId(dto.typeId);
        if (temp) {
            const id = temp.id;
            const data = {
                fileName: dto.fileName
            };
            await this.update({ id }, data);
            return await this.findById(id);
        }
        const entity = await this.create({
            type: { id: dto.typeId },
            fileName: dto.fileName
        });
        return await this.save(entity);
    }
    async findByTypeId(id) {
        return await this.findOne({ where: { type: { id } }, relations: ['type'] });
    }
    async findById(id) {
        return await this.findOne({ where: { id }, relations: ['type'] });
    }
};
CertificateTemplateRepository = __decorate([
    (0, typeorm_1.EntityRepository)(certificate_template_entity_1.CertificateTemplate)
], CertificateTemplateRepository);
exports.CertificateTemplateRepository = CertificateTemplateRepository;
//# sourceMappingURL=certificate-template.repository.js.map