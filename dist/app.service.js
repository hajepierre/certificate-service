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
let AppService = class AppService {
    constructor() {
        this.color = '#0066FF';
    }
    generatePracticingIndividualCertificate(dto) {
        return new Promise((resolve) => {
            const { year, fullName, membershipType, field, registrationNumber, expiryDate, doneDate } = dto;
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
        return new Promise((resolve) => {
            const { companyName, registrationNumber, expiryDate, councilMeetingDate, field, doneDate } = dto;
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
        return new Promise((resolve) => {
            const { year, fullName, membershipType, field, doneDate } = dto;
            const doc = new PDFDocument({ autoFirstPage: false });
            const id = (0, uuid_1.v4)().replace(/-/g, '');
            const fileName = `public/certificate_${id}.pdf`;
            doc.pipe(fs.createWriteStream(fileName));
            const img = doc.openImage('public/templates/non_practing_template.jpg');
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
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map