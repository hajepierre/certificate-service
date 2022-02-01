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
exports.CreateCertificateTemplateDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const file_dto_1 = require("./file.dto");
class CreateCertificateTemplateDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Certificate Type Id', required: true }),
    __metadata("design:type", String)
], CreateCertificateTemplateDTO.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File data', required: true }),
    __metadata("design:type", file_dto_1.FileDTO)
], CreateCertificateTemplateDTO.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Template parameters', required: true, example: [
            {
                "paramName": "discipline",
                "xCoordinate": 11,
                "yCoordinate": 20,
                "color": "ffaa00",
                "font": "italic",
                "width": 100,
                "breadth": 210
            }
        ]
    }),
    __metadata("design:type", Array)
], CreateCertificateTemplateDTO.prototype, "params", void 0);
exports.CreateCertificateTemplateDTO = CreateCertificateTemplateDTO;
//# sourceMappingURL=create-certificate-template.dto.js.map