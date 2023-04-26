"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const uuid_1 = require("uuid");
const qr = require("qr-image");
let AppService = class AppService {
    constructor() {
        this.color = '#0066FF';
        this.fontSize = 12;
    }
    generateCertificate(templateFileName, params, dto) {
        return new Promise(async (resolve) => {
            const qrBuffer = await this.generateQR(dto.certificateNumber);
            if (params.length > 0) {
                const doc = new PDFDocument({ autoFirstPage: false });
                const id = (0, uuid_1.v4)().replace(/-/g, '');
                const fileName = `public/certificate_${id}.pdf`;
                doc.pipe(fs.createWriteStream(fileName));
                const img = doc.openImage(`public/templates/${templateFileName}`);
                doc.addPage({
                    size: [img.width, img.height],
                });
                doc.image(img, 0, 0);
                for (const p of params) {
                    if (p.paramName === 'qr') {
                        doc
                            .image(qrBuffer, p.xCoordinate, p.yCoordinate, { fit: [p.width, p.breadth] })
                            .rect(p.xCoordinate, p.yCoordinate, p.width, p.breadth)
                            .stroke();
                    }
                    doc
                        .fillColor(p.color || this.color)
                        .fontSize(p.fontSize || this.fontSize)
                        .text(dto[p.paramName], p.xCoordinate, p.yCoordinate);
                }
                doc.end();
                fs.readFile(fileName, (error, data) => {
                    if (error) {
                        console.log(`Error ${error}`);
                    }
                    else {
                        try {
                            fs.unlinkSync(fileName);
                        }
                        catch (error) {
                            console.log(error);
                        }
                        resolve(data);
                    }
                });
            }
            else {
                resolve(null);
            }
        });
    }
    generateQR(docNumber) {
        return qr.imageSync(`${process.env.CERT_VERIFY}${docNumber}`, {
            type: 'png',
            ec_level: 'H',
            margin: 1,
        });
    }
    async fileToBase64(fileName) {
        var bitmap = await fs.readFileSync(fileName);
        return Buffer.from(bitmap).toString('base64');
    }
    decodeAndSave(base64str, fileName) {
        var bitmap = Buffer.from(base64str, 'base64');
        fs.writeFileSync(fileName, bitmap);
        console.log('******** File created from base64 encoded string ********');
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map