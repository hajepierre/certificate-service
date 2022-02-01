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
exports.CertificateTemplate = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
const certificate_template_params_entity_1 = require("./certificate-template-params.entity");
const certificates_type_entity_1 = require("./certificates-type.entity");
let CertificateTemplate = class CertificateTemplate extends base_1.Base {
};
__decorate([
    (0, typeorm_1.OneToOne)(() => certificates_type_entity_1.CertificateType),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", certificates_type_entity_1.CertificateType)
], CertificateTemplate.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], CertificateTemplate.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certificate_template_params_entity_1.CertificateTemplateParams, param => param.template),
    __metadata("design:type", Array)
], CertificateTemplate.prototype, "params", void 0);
CertificateTemplate = __decorate([
    (0, typeorm_1.Entity)()
], CertificateTemplate);
exports.CertificateTemplate = CertificateTemplate;
//# sourceMappingURL=certificate-template.entity.js.map