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
        this.templates = {
            individual: 'individual_template.jpg',
            firm: 'firm_template.jpg',
            graduate: 'non_practicing_template.jpg'
        };
    }
    generatePracticingIndividualCertificate(dto) {
        return new Promise(async (resolve) => {
            const { year, fullName, membershipType, field, registrationNumber, expiryDate, doneDate } = dto;
            const qrBuffer = await this.generateQR(dto.certificateNumber);
            const doc = new PDFDocument({ autoFirstPage: false });
            const id = (0, uuid_1.v4)().replace(/-/g, '');
            const fileName = `public/certificate_${id}.pdf`;
            doc.pipe(fs.createWriteStream(fileName));
            const img = doc.openImage('public/templates/individual_template.jpg');
            doc.addPage({
                size: [img.width, img.height],
            });
            doc.image(img, 0, 0);
            doc.fillColor(this.color).fontSize(90).text(year, 2755, 757);
            const centerPoint = Math.floor(img.width / 2 - fullName.length * 19);
            doc.fillColor(this.color).fontSize(80).text(fullName, centerPoint, 1050);
            doc.fillColor(this.color).fontSize(80).text(membershipType, 1355, 1160);
            doc.fillColor(this.color).fontSize(70).text(field, 1655, 1282);
            doc
                .fillColor(this.color)
                .fontSize(75)
                .text(registrationNumber, 1848, 1395);
            doc.fillColor(this.color).fontSize(50).text(expiryDate, 1895, 1740);
            doc.fillColor(this.color).fontSize(60).text(doneDate, 1910, 1895);
            doc
                .image(qrBuffer, 1630, 1995, { fit: [400, 400] })
                .rect(1630, 1995, 400, 400)
                .stroke();
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
        });
    }
    generatePracticingFirmCertificate(dto) {
        return new Promise(async (resolve) => {
            const { companyName, registrationNumber, expiryDate, councilMeetingDate, field, doneDate } = dto;
            const qrBuffer = await this.generateQR(dto.certificateNumber);
            const doc = new PDFDocument({ autoFirstPage: false });
            const id = (0, uuid_1.v4)().replace(/-/g, '');
            const fileName = `public/certificate_${id}.pdf`;
            doc.pipe(fs.createWriteStream(fileName));
            const img = doc.openImage('public/templates/firm_template.jpg');
            doc.addPage({
                size: [img.width, img.height],
            });
            doc.image(img, 0, 0);
            const centerPoint = Math.floor(img.width / 2 - companyName.length * 19);
            doc
                .fillColor(this.color)
                .fontSize(80)
                .text(companyName, centerPoint, 1120);
            doc
                .fillColor(this.color)
                .fontSize(75)
                .text(registrationNumber, 1648, 1245);
            doc.fillColor(this.color).fontSize(70).text(expiryDate, 2255, 1508);
            doc
                .fillColor(this.color)
                .fontSize(60)
                .text(councilMeetingDate, 1400, 1730);
            doc.fillColor(this.color).fontSize(70).text(field, 2285, 1725);
            doc.fillColor(this.color).fontSize(60).text(doneDate, 1920, 1895);
            doc
                .image(qrBuffer, 1630, 1995, { fit: [400, 400] })
                .rect(1630, 1995, 400, 400)
                .stroke();
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
        });
    }
    generateNonPracticingCertificate(dto) {
        return new Promise(async (resolve) => {
            const { year, fullName, membershipType, field, doneDate } = dto;
            const qrBuffer = await this.generateQR(dto.certificateNumber);
            const doc = new PDFDocument({ autoFirstPage: false });
            const id = (0, uuid_1.v4)().replace(/-/g, '');
            const fileName = `public/certificate_${id}.pdf`;
            doc.pipe(fs.createWriteStream(fileName));
            const img = doc.openImage('public/templates/non_practicing_template.jpg');
            doc.addPage({
                size: [img.width, img.height],
            });
            doc.image(img, 0, 0);
            doc.
                fillColor(this.color)
                .fontSize(90)
                .text(year, 2850, 763);
            const centerPoint = Math.floor((img.width / 2) - (fullName.length * 19));
            doc.
                fillColor(this.color)
                .fontSize(80)
                .text(fullName, centerPoint, 1130);
            doc.
                fillColor(this.color)
                .fontSize(80)
                .text(membershipType, 1785, 1255);
            doc.
                fillColor(this.color)
                .fontSize(70)
                .text(field, 1600, 1381);
            doc.
                fillColor(this.color)
                .fontSize(60)
                .text(doneDate, 1910, 1895);
            doc
                .image(qrBuffer, 1630, 1995, { fit: [400, 400] })
                .rect(1630, 1995, 400, 400)
                .stroke();
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
        });
    }
    generateQR(docNumber) {
        return qr.imageSync(`${process.env.CERT_VERIFY}${docNumber}`, {
            type: 'png',
            ec_level: 'H',
            margin: 1,
        });
    }
    async getTemplates() {
        const result = [];
        const individualFileText = await this.fileToBase64('public/templates/originals/individual_template.jpg');
        const firmFileText = await this.fileToBase64('public/templates/originals/firm_template.jpg');
        const graduageFileText = await this.fileToBase64('public/templates/originals/non_practicing_template.jpg');
        const individualTemplate = {
            fileText: individualFileText,
            type: 'jpg',
            name: 'individual_template.jpg',
            changed: true,
            membershipType: 'individual'
        };
        const firmTemplate = {
            fileText: firmFileText,
            type: 'jpg',
            name: 'firm_template.jpg',
            changed: true,
            membershipType: 'firm'
        };
        const graduateTemplate = {
            fileText: graduageFileText,
            type: 'jpg',
            name: 'non_practicing_template.jpg',
            changed: true,
            membershipType: 'graduate'
        };
        result.push(individualTemplate);
        result.push(firmTemplate);
        result.push(graduateTemplate);
        return result;
    }
    async uploadTemplate(dto) {
        let message = 'Unknown membership type';
        let status = 'FAILED';
        const fileName = this.templates[dto.membershipType.toLocaleLowerCase()];
        if (fileName) {
            try {
                this.decodeAndSave(dto.fileText, `public/templates/${fileName}`);
                message = 'Template is upload successfully';
                status = 'SUCCESS';
            }
            catch (error) {
                message = error;
            }
        }
        return { message, status };
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