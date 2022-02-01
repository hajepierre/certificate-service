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
exports.CertificateTypeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class CertificateTypeDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of certificate type. Ensure the name does not have white spaces in it', required: true, example: 'firmCertificate' }),
    __metadata("design:type", String)
], CertificateTypeDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Certificate for companies' }),
    __metadata("design:type", String)
], CertificateTypeDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'certificate specific params', example: { 'year': '', 'discripline': '' } }),
    __metadata("design:type", Object)
], CertificateTypeDTO.prototype, "params", void 0);
exports.CertificateTypeDTO = CertificateTypeDTO;
//# sourceMappingURL=certificates-type.dto.js.map