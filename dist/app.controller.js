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
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getFirmCertificates(res, companyName, registrationNumber, councilMeetingDate, expiryDate, displine, signatureDate) {
        const dto = {
            companyName,
            registrationNumber,
            councilMeetingDate,
            expiryDate,
            field: displine,
            doneDate: signatureDate
        };
        this.appService.generatePracticingFirmCertificate(dto).then(buffer => {
            res.send(buffer);
        });
    }
    generateIndividualCertificates(res, year, fullName, membershipClassName, registrationNumber, displine, expiryDate, signatureDate) {
        const dto = {
            year,
            fullName,
            membershipType: membershipClassName,
            field: displine,
            expiryDate,
            doneDate: signatureDate,
            registrationNumber
        };
        this.appService.generatePracticingIndividualCertificate(dto).then(buffer => {
            res.send(buffer);
        });
    }
    generateGraduatesCertificates(res, year, fullName, membershipClassName, displine, signatureDate) {
        const dto = {
            year,
            fullName,
            membershipType: membershipClassName,
            field: displine,
            doneDate: signatureDate
        };
        this.appService.generateNonPracticingCertificate(dto).then(buffer => {
            res.send(buffer);
        });
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
    (0, swagger_1.ApiQuery)({ name: 'displine', required: true, description: 'Discipline' }),
    (0, swagger_1.ApiQuery)({ name: 'signatureDate', required: true, description: 'Certificate signature date' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('companyName')),
    __param(2, (0, common_1.Query)('registrationNumber')),
    __param(3, (0, common_1.Query)('councilMeetingDate')),
    __param(4, (0, common_1.Query)('expiryDate')),
    __param(5, (0, common_1.Query)('displine')),
    __param(6, (0, common_1.Query)('signatureDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getFirmCertificates", null);
__decorate([
    (0, common_1.Get)('individual'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Certificate for individuals' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true, description: 'Certified Year' }),
    (0, swagger_1.ApiQuery)({ name: 'fullName', required: true, description: 'Member full Name starting with Title' }),
    (0, swagger_1.ApiQuery)({ name: 'membershipClassName', required: true, description: 'Membership Class Name' }),
    (0, swagger_1.ApiQuery)({ name: 'registrationNumber', required: true, description: 'Registration Number' }),
    (0, swagger_1.ApiQuery)({ name: 'displine', required: true, description: 'Discipline' }),
    (0, swagger_1.ApiQuery)({ name: 'expiryDate', required: true, description: 'Expiry Date' }),
    (0, swagger_1.ApiQuery)({ name: 'signatureDate', required: true, description: 'Certificate signature date' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('fullName')),
    __param(3, (0, common_1.Query)('membershipClassName')),
    __param(4, (0, common_1.Query)('registrationNumber')),
    __param(5, (0, common_1.Query)('displine')),
    __param(6, (0, common_1.Query)('expiryDate')),
    __param(7, (0, common_1.Query)('signatureDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "generateIndividualCertificates", null);
__decorate([
    (0, common_1.Get)('graduates'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Certificate for non-practicing graduates' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true, description: 'Certified Year' }),
    (0, swagger_1.ApiQuery)({ name: 'fullName', required: true, description: 'Member full Name starting with Title' }),
    (0, swagger_1.ApiQuery)({ name: 'membershipClassName', required: true, description: 'Membership Class Name' }),
    (0, swagger_1.ApiQuery)({ name: 'displine', required: true, description: 'Discipline' }),
    (0, swagger_1.ApiQuery)({ name: 'signatureDate', required: true, description: 'Certificate signature date' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('fullName')),
    __param(3, (0, common_1.Query)('membershipClassName')),
    __param(4, (0, common_1.Query)('displine')),
    __param(5, (0, common_1.Query)('signatureDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "generateGraduatesCertificates", null);
AppController = __decorate([
    (0, common_1.Controller)('api/v1/certificates'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map