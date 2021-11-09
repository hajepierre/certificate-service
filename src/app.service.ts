import { Injectable } from '@nestjs/common';

import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { FirmCertificate } from './dtos/firm-certificate.dto';
import { IndividualCertificate } from './dtos/individual-certificates.dto';
import { GraduateCertificate } from './dtos/graduate-certificate.dto';
import * as qr from 'qr-image';

@Injectable()
export class AppService {
  color = '#0066FF';

  chairmanSignaure;
  registrarSignature;

  generatePracticingIndividualCertificate(dto: IndividualCertificate) {
    return new Promise(async (resolve) => {
      const { year, fullName, membershipType, field, registrationNumber, expiryDate, doneDate } = dto;

      const qrBuffer = await this.generateQR(dto.certificateNumber);

      const doc = new PDFDocument({ autoFirstPage: false });
      const id = uuidv4().replace(/-/g, '');
      const fileName = `public/certificate_${id}.pdf`;

      doc.pipe(fs.createWriteStream(fileName));
      const img = doc.openImage('public/templates/individual_template.jpg');

      // signature images
      this.chairmanSignaure = doc.openImage('public/templates/chairman.png');
      this.registrarSignature = doc.openImage('public/templates/registrar.png');

      doc.addPage({
        size: [img.width, img.height],
      });

      doc.image(img, 0, 0);

      // Setting year
      doc.fillColor(this.color).fontSize(90).text(year, 2755, 757);

      // Setting full name
      const centerPoint = Math.floor(img.width / 2 - fullName.length * 19);
      doc.fillColor(this.color).fontSize(80).text(fullName, centerPoint, 1050);

      // Set membership type
      doc.fillColor(this.color).fontSize(80).text(membershipType, 1355, 1160);

      // setting field
      doc.fillColor(this.color).fontSize(70).text(field, 1655, 1282);

      // setting registration number
      doc
        .fillColor(this.color)
        .fontSize(75)
        .text(registrationNumber, 1848, 1395);

      // setting expiry
      doc.fillColor(this.color).fontSize(50).text(expiryDate, 1895, 1740);

      // setting field
      doc.fillColor(this.color).fontSize(60).text(doneDate, 1910, 1895);

      // Adding qr code
      doc
        .image(qrBuffer, 1630, 1995, { fit: [400, 400] })
        .rect(1630, 1995, 400, 400)
        .stroke();

      // Add chairman signature
      // doc
      //   .image(this.chairmanSignaure, 700, 2250)

      // Add registrar signature
      // doc
      //   .image(this.chairmanSignaure, 2700, 2250)

      // doc
      //   .image(this.registrarSignature, 1500, 1500)

      doc.end();

      fs.readFile(fileName, (error, data) => {
        if (error) {
          console.log(`Error ${error}`);
        } else {
          try {
            fs.unlinkSync(fileName);
          } catch (error) {
            console.log(error);
          }
          resolve(data);
        }
      });
    });
  }

  generatePracticingFirmCertificate(dto: FirmCertificate) {
    return new Promise(async (resolve) => {
      const { companyName, registrationNumber, expiryDate, councilMeetingDate, field, doneDate } = dto;

      const qrBuffer = await this.generateQR(dto.certificateNumber);

      const doc = new PDFDocument({ autoFirstPage: false });
      const id = uuidv4().replace(/-/g, '');
      const fileName = `public/certificate_${id}.pdf`;

      doc.pipe(fs.createWriteStream(fileName));
      const img = doc.openImage('public/templates/firm_template.jpg');

      doc.addPage({
        size: [img.width, img.height],
      });

      doc.image(img, 0, 0);

      // Setting company name
      const centerPoint = Math.floor(img.width / 2 - companyName.length * 19);
      doc
        .fillColor(this.color)
        .fontSize(80)
        .text(companyName, centerPoint, 1120);

      // setting registration number
      doc
        .fillColor(this.color)
        .fontSize(75)
        .text(registrationNumber, 1648, 1245);

      // setting expiry
      doc.fillColor(this.color).fontSize(70).text(expiryDate, 2255, 1508);

      // setting doneDate
      doc
        .fillColor(this.color)
        .fontSize(60)
        .text(councilMeetingDate, 1400, 1730);

      // setting field
      doc.fillColor(this.color).fontSize(70).text(field, 2285, 1725);

      // setting done date
      doc.fillColor(this.color).fontSize(60).text(doneDate, 1920, 1895);

      // Adding qr code
      doc
        .image(qrBuffer, 1630, 1995, { fit: [400, 400] })
        .rect(1630, 1995, 400, 400)
        .stroke();
      doc.end();

      fs.readFile(fileName, (error, data) => {
        if (error) {
          console.log(`Error ${error}`);
        } else {
          try {
            fs.unlinkSync(fileName);
          } catch (error) {
            console.log(error);
          }
          resolve(data);
        }
      });
    });
  }

  generateNonPracticingCertificate(dto: GraduateCertificate) {
    return new Promise(async (resolve) => {
      const { year, fullName, membershipType, field, doneDate } = dto;

      const qrBuffer = await this.generateQR(dto.certificateNumber);

      const doc = new PDFDocument({ autoFirstPage: false });
      const id = uuidv4().replace(/-/g, '');
      const fileName = `public/certificate_${id}.pdf`;

      doc.pipe(fs.createWriteStream(fileName));
      const img = doc.openImage('public/templates/non_practicing_template.jpg');

      doc.addPage({
        size: [img.width, img.height],
      });

      doc.image(img, 0, 0);

      // Setting year 
      doc.
        fillColor(this.color)
        .fontSize(90)
        .text(year, 2850, 763);

      // Setting company name
      const centerPoint = Math.floor((img.width / 2) - (fullName.length * 19))
      doc.
        fillColor(this.color)
        .fontSize(80)
        .text(fullName, centerPoint, 1130);

      // Set membership type
      doc.
        fillColor(this.color)
        .fontSize(80)
        .text(membershipType, 1785, 1255);

      // setting field
      doc.
        fillColor(this.color)
        .fontSize(70)
        .text(field, 1600, 1381);

      // setting field
      doc.
        fillColor(this.color)
        .fontSize(60)
        .text(doneDate, 1910, 1895);

      // Adding qr code
      doc
        .image(qrBuffer, 1630, 1995, { fit: [400, 400] })
        .rect(1630, 1995, 400, 400)
        .stroke();

      doc.end();

      fs.readFile(fileName, (error, data) => {
        if (error) {
          console.log(`Error ${error}`);
        } else {
          try {
            fs.unlinkSync(fileName);
          } catch (error) {
            console.log(error);
          }
          resolve(data);
        }
      });
    });
  }

  generateQR(docNumber: string) {
    return qr.imageSync(`${process.env.CERT_VERIFY}/${docNumber}/check`, {
      type: 'png',
      ec_level: 'H',
      margin: 1,
    });
  }
}
