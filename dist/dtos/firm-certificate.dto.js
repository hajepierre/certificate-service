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
exports.FirmCertificate = void 0;
const swagger_1 = require("@nestjs/swagger");
class FirmCertificate {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Firm Name' }),
    __metadata("design:type", String)
], FirmCertificate.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Registration Number' }),
    __metadata("design:type", String)
], FirmCertificate.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'expiryDate' }),
    __metadata("design:type", String)
], FirmCertificate.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Council Meeting Date' }),
    __metadata("design:type", String)
], FirmCertificate.prototype, "councilMeetingDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Engineering field' }),
    __metadata("design:type", String)
], FirmCertificate.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Signature Date' }),
    __metadata("design:type", String)
], FirmCertificate.prototype, "doneDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Certificate Number' }),
    __metadata("design:type", String)
], FirmCertificate.prototype, "certificateNumber", void 0);
exports.FirmCertificate = FirmCertificate;
//# sourceMappingURL=firm-certificate.dto.js.map