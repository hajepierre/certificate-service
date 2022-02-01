"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesTypeRepository = void 0;
const certificates_type_dto_1 = require("../dtos/certificates-type.dto");
const certificates_type_entity_1 = require("../entities/certificates-type.entity");
const typeorm_1 = require("typeorm");
let CertificatesTypeRepository = class CertificatesTypeRepository extends typeorm_1.Repository {
    async add(dto) {
        const temp = await this.findByName(dto.name);
        if (temp) {
            const id = temp.id;
            await this.update({ id }, { params: dto.params });
            return await this.findById(id);
        }
        const entity = await this.create(dto);
        return await this.save(entity);
    }
    async findByName(name) {
        return await this.findOne({ where: { name } });
    }
    async findById(id) {
        return await this.findOne({ where: { id } });
    }
};
CertificatesTypeRepository = __decorate([
    (0, typeorm_1.EntityRepository)(certificates_type_entity_1.CertificateType)
], CertificatesTypeRepository);
exports.CertificatesTypeRepository = CertificatesTypeRepository;
//# sourceMappingURL=certificates-type.repository.js.map