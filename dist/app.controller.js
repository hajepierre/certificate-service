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
const ack_dto_1 = require("./dtos/ack.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const file_dto_1 = require("./dtos/file.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getFirmCertificates(res, companyName, registrationNumber, councilMeetingDate, expiryDate, discipline, signatureDate, certificateNumber) {
        const dto = {
            companyName,
            registrationNumber,
            councilMeetingDate,
            expiryDate,
            field: discipline,
            doneDate: signatureDate,
            certificateNumber
        };
        const retries = 5;
        let counter = 0;
        let buffer = await this.appService.generatePracticingFirmCertificate(dto);
        let len = buffer.toString().length;
        while (len === 9 && counter <= retries) {
            buffer = await this.appService.generatePracticingFirmCertificate(dto);
            len = buffer.toString().length;
            counter++;
        }
        res.send(buffer);
    }
    async generateIndividualCertificates(res, year, fullName, membershipClassName, registrationNumber, discipline, expiryDate, signatureDate, certificateNumber) {
        const dto = {
            year,
            fullName,
            membershipType: membershipClassName,
            field: discipline,
            expiryDate,
            doneDate: signatureDate,
            registrationNumber,
            certificateNumber
        };
        const retries = 5;
        let counter = 0;
        let buffer = await this.appService.generatePracticingIndividualCertificate(dto);
        let len = buffer.toString().length;
        while (len === 9 && counter <= retries) {
            buffer = await this.appService.generatePracticingIndividualCertificate(dto);
            len = buffer.toString().length;
            counter++;
        }
        res.send(buffer);
    }
    async generateGraduatesCertificates(res, year, fullName, membershipClassName, discipline, signatureDate, certificateNumber) {
        const dto = {
            year,
            fullName,
            membershipType: membershipClassName,
            field: discipline,
            doneDate: signatureDate,
            certificateNumber
        };
        const retries = 5;
        let counter = 0;
        let buffer = await this.appService.generateNonPracticingCertificate(dto);
        let len = buffer.toString().length;
        while (len === 9 && counter <= retries) {
            buffer = await this.appService.generateNonPracticingCertificate(dto);
            len = buffer.toString().length;
            counter++;
        }
        res.send(buffer);
    }
    async getTemplates() {
        return await this.appService.getTemplates();
    }
    async getTemplateByMembershipType(membershipType) {
        return await this.appService.getTemplate(membershipType);
    }
    async uploadTemplate(dto) {
        return await this.appService.uploadTemplate(dto);
    }
};
__decorate([
    (0, common_1.Get)('firm'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Certificate for firms' }),
    (0, swagger_1.ApiQuery)({ name: 'companyName', required: true, description: 'Company Name' }),
    (0, swagger_1.ApiQuery)({ name: 'registrationNumber', required: true, description: 'Registration Number' }),
    (0, swagger_1.ApiQuery)({ name: 'councilMeetingDate', required: true, description: 'Council Meeting Date' }),
    (0, swagger_1.ApiQuery)({ name: 'expiryDate', required: true, description: 'Expiry Date' }),
    (0, swagger_1.ApiQuery)({ name: 'discipline', required: true, description: 'Discipline' }),
    (0, swagger_1.ApiQuery)({ name: 'signatureDate', required: true, description: 'Certificate signature date' }),
    (0, swagger_1.ApiQuery)({ name: 'certificateNumber', required: true, description: 'Certificate number' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('companyName')),
    __param(2, (0, common_1.Query)('registrationNumber')),
    __param(3, (0, common_1.Query)('councilMeetingDate')),
    __param(4, (0, common_1.Query)('expiryDate')),
    __param(5, (0, common_1.Query)('discipline')),
    __param(6, (0, common_1.Query)('signatureDate')),
    __param(7, (0, common_1.Query)('certificateNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getFirmCertificates", null);
__decorate([
    (0, common_1.Get)('individual'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Certificate for individuals' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true, description: 'Certified Year' }),
    (0, swagger_1.ApiQuery)({ name: 'fullName', required: true, description: 'Member full Name starting with Title' }),
    (0, swagger_1.ApiQuery)({ name: 'membershipClassName', required: true, description: 'Membership Class Name' }),
    (0, swagger_1.ApiQuery)({ name: 'registrationNumber', required: true, description: 'Registration Number' }),
    (0, swagger_1.ApiQuery)({ name: 'discipline', required: true, description: 'Discipline' }),
    (0, swagger_1.ApiQuery)({ name: 'expiryDate', required: true, description: 'Expiry Date' }),
    (0, swagger_1.ApiQuery)({ name: 'signatureDate', required: true, description: 'Certificate signature date' }),
    (0, swagger_1.ApiQuery)({ name: 'certificateNumber', required: true, description: 'Certificate number' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('fullName')),
    __param(3, (0, common_1.Query)('membershipClassName')),
    __param(4, (0, common_1.Query)('registrationNumber')),
    __param(5, (0, common_1.Query)('discipline')),
    __param(6, (0, common_1.Query)('expiryDate')),
    __param(7, (0, common_1.Query)('signatureDate')),
    __param(8, (0, common_1.Query)('certificateNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "generateIndividualCertificates", null);
__decorate([
    (0, common_1.Get)('graduates'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Certificate for non-practicing graduates' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true, description: 'Certified Year' }),
    (0, swagger_1.ApiQuery)({ name: 'fullName', required: true, description: 'Member full Name starting with Title' }),
    (0, swagger_1.ApiQuery)({ name: 'membershipClassName', required: true, description: 'Membership Class Name' }),
    (0, swagger_1.ApiQuery)({ name: 'discipline', required: true, description: 'Discipline' }),
    (0, swagger_1.ApiQuery)({ name: 'signatureDate', required: true, description: 'Certificate signature date' }),
    (0, swagger_1.ApiQuery)({ name: 'certificateNumber', required: true, description: 'Certificate number' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('fullName')),
    __param(3, (0, common_1.Query)('membershipClassName')),
    __param(4, (0, common_1.Query)('discipline')),
    __param(5, (0, common_1.Query)('signatureDate')),
    __param(6, (0, common_1.Query)('certificateNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "generateGraduatesCertificates", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of certificate templates',
        type: [file_dto_1.FileDTO]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)('templates/:membershipType'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of certificate templates',
        type: file_dto_1.FileDTO
    }),
    __param(0, (0, common_1.Param)('membershipType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTemplateByMembershipType", null);
__decorate([
    (0, common_1.Post)('templates/upload'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of certificate templates',
        type: ack_dto_1.AckResponseDTO
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_dto_1.FileDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadTemplate", null);
AppController = __decorate([
    (0, common_1.Controller)('certificates'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map