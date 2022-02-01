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
exports.ParamDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class ParamDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Parameter name', required: true }),
    __metadata("design:type", String)
], ParamDTO.prototype, "paramName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'x coordinate value', required: true }),
    __metadata("design:type", Number)
], ParamDTO.prototype, "xCoordinate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'y coordinate value', required: true }),
    __metadata("design:type", Number)
], ParamDTO.prototype, "yCoordinate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'color code', required: false }),
    __metadata("design:type", String)
], ParamDTO.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Font family', required: false }),
    __metadata("design:type", String)
], ParamDTO.prototype, "font", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Width', required: false }),
    __metadata("design:type", Number)
], ParamDTO.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Height/breadth', required: false }),
    __metadata("design:type", Number)
], ParamDTO.prototype, "breadth", void 0);
exports.ParamDTO = ParamDTO;
//# sourceMappingURL=param.dto.js.map