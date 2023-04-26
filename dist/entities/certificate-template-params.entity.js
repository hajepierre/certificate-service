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
exports.CertificateTemplateParams = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
const certificate_template_entity_1 = require("./certificate-template.entity");
let CertificateTemplateParams = class CertificateTemplateParams extends base_1.Base {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => certificate_template_entity_1.CertificateTemplate, template => template.params, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'template_id' }),
    __metadata("design:type", certificate_template_entity_1.CertificateTemplate)
], CertificateTemplateParams.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CertificateTemplateParams.prototype, "paramName", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], CertificateTemplateParams.prototype, "xCoordinate", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], CertificateTemplateParams.prototype, "yCoordinate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CertificateTemplateParams.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CertificateTemplateParams.prototype, "fontSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CertificateTemplateParams.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CertificateTemplateParams.prototype, "breadth", void 0);
CertificateTemplateParams = __decorate([
    (0, typeorm_1.Entity)()
], CertificateTemplateParams);
exports.CertificateTemplateParams = CertificateTemplateParams;
//# sourceMappingURL=certificate-template-params.entity.js.map