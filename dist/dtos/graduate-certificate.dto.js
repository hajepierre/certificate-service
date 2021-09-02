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
exports.GraduateCertificate = void 0;
const swagger_1 = require("@nestjs/swagger");
class GraduateCertificate {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Year' }),
    __metadata("design:type", String)
], GraduateCertificate.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mr. Joe Doe', description: 'Full Name, starting with title' }),
    __metadata("design:type", String)
], GraduateCertificate.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Membership class Name' }),
    __metadata("design:type", String)
], GraduateCertificate.prototype, "membershipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Discipline' }),
    __metadata("design:type", String)
], GraduateCertificate.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Signature Date' }),
    __metadata("design:type", String)
], GraduateCertificate.prototype, "doneDate", void 0);
exports.GraduateCertificate = GraduateCertificate;
//# sourceMappingURL=graduate-certificate.dto.js.map