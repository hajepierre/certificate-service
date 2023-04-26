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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const certificates_service_1 = require("./certificates.service");
const response_dto_1 = require("./dtos/response.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const create_certificate_template_dto_1 = require("./dtos/create-certificate-template.dto");
const certificate_type_dto_1 = require("./dtos/certificate-type.dto");
const certificates_type_dto_1 = require("./dtos/certificates-type.dto");
let AppController = class AppController {
    constructor(appService, certificatesService) {
        this.appService = appService;
        this.certificatesService = certificatesService;
        this.logger = new common_1.Logger("AppController");
    }
    async getCertificateTypes() {
        return await this.certificatesService.getCertificateTypes();
    }
    async addCertificateType(dto) {
        return await this.certificatesService.addCertificateType(dto);
    }
    async configureTemplate(dto) {
        return await this.certificatesService.configureTemplate(dto);
    }
    async generateCertificate(dto, name, res) {
        const template = await this.certificatesService.getCertificateByTypeName(name);
        if (template) {
            const retries = 5;
            let counter = 0;
            const params = await this.certificatesService.getTemplateParamsById(template.id);
            let buffer = await this.appService.generateCertificate(template.fileName, params, dto);
            let len = buffer.toString().length;
            while (len === 9 && counter <= retries) {
                buffer = await this.appService.generateCertificate(template.fileName, params, dto);
                len = buffer.toString().length;
                counter++;
            }
            res.send(buffer);
        }
        else {
            res.status(404).send({ error: `No template was found associted with certificate type: ${name}` });
        }
    }
};
__decorate([
    (0, common_1.Get)('certificate-types'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of certificate types',
        type: [certificate_type_dto_1.CertificatesTypeDTO]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCertificateTypes", null);
__decorate([
    (0, common_1.Post)('certificate-types'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Add Certificate Type',
        type: certificate_type_dto_1.CertificatesTypeDTO
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [certificates_type_dto_1.CertificateTypeDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addCertificateType", null);
__decorate([
    (0, common_1.Post)('templates'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Configure template',
        type: response_dto_1.ResponseDTO
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_certificate_template_dto_1.CreateCertificateTemplateDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "configureTemplate", null);
__decorate([
    (0, common_1.Post)('certificate-types/:name'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Configure template',
        type: response_dto_1.ResponseDTO
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('name')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "generateCertificate", null);
AppController = __decorate([
    (0, common_1.Controller)('certificates'),
    __metadata("design:paramtypes", [app_service_1.AppService, certificates_service_1.CertificatesService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map