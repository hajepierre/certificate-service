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
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const firm_certificate_dto_1 = require("./dtos/firm-certificate.dto");
const graduate_certificate_dto_1 = require("./dtos/graduate-certificate.dto");
const individual_certificates_dto_1 = require("./dtos/individual-certificates.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    generateFirmCertificates(res, dto) {
        this.appService.generatePracticingFirmCertificate(dto).then(buffer => {
            res.send(buffer);
        });
    }
    generateIndividualCertificates(res, dto) {
        this.appService.generatePracticingIndividualCertificate(dto).then(buffer => {
            res.send(buffer);
        });
    }
    generateGraduatesCertificates(res, dto) {
        this.appService.generateNonPracticingCertificate(dto).then(buffer => {
            res.send(buffer);
        });
    }
};
__decorate([
    (0, common_1.Post)('firm'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Certificate for firms' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, firm_certificate_dto_1.FirmCertificate]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "generateFirmCertificates", null);
__decorate([
    (0, common_1.Post)('individual'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Certificate for individuals' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, individual_certificates_dto_1.IndividualCertificate]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "generateIndividualCertificates", null);
__decorate([
    (0, common_1.Post)('graduates'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Certificate for non-practicing graduates' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, graduate_certificate_dto_1.GraduateCertificate]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "generateGraduatesCertificates", null);
AppController = __decorate([
    (0, common_1.Controller)('api/v1/certificates'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map