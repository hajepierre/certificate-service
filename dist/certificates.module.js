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
exports.CertificatesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const certificates_type_entity_1 = require("./entities/certificates-type.entity");
const certificate_template_entity_1 = require("./entities/certificate-template.entity");
const certificate_template_params_entity_1 = require("./entities/certificate-template-params.entity");
const certificates_type_repository_1 = require("./repositories/certificates-type.repository");
const certificate_template_repository_1 = require("./repositories/certificate-template.repository");
const certificate_template_params_repository_1 = require("./repositories/certificate-template-params.repository");
const certificates_service_1 = require("./certificates.service");
const app_service_1 = require("./app.service");
let CertificatesModule = class CertificatesModule {
    constructor(service) {
        this.service = service;
    }
    onModuleInit() {
        this.service.seedTypes();
    }
};
CertificatesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([certificates_type_entity_1.CertificateType, certificate_template_entity_1.CertificateTemplate, certificate_template_params_entity_1.CertificateTemplateParams, certificates_type_repository_1.CertificatesTypeRepository, certificate_template_repository_1.CertificateTemplateRepository, certificate_template_params_repository_1.CertificateTemplateParamsRepository])],
        controllers: [app_controller_1.AppController],
        providers: [
            certificates_service_1.CertificatesService,
            app_service_1.AppService
        ],
    }),
    __metadata("design:paramtypes", [certificates_service_1.CertificatesService])
], CertificatesModule);
exports.CertificatesModule = CertificatesModule;
//# sourceMappingURL=certificates.module.js.map