import { Injectable } from '@nestjs/common';

import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as qr from 'qr-image';
import { CertificateTemplateParams } from './entities/certificate-template-params.entity';

@Injectable()
export class AppService {
  color = '#0066FF';
  fontSize = 12;


  generateCertificate(templateFileName: string, params: CertificateTemplateParams[], dto: any) {
    return new Promise(async (resolve) => {
      const qrBuffer = await this.generateQR(dto.certificateNumber);
      if (params.length > 0) {
        const doc = new PDFDocument({ autoFirstPage: false });
        const id = uuidv4().replace(/-/g, '');
        const fileName = `public/certificate_${id}.pdf`;

        doc.pipe(fs.createWriteStream(fileName));
        const img = doc.openImage(`public/templates/${templateFileName}`);
        doc.addPage({
          size: [img.width, img.height],
        });

        doc.image(img, 0, 0);

        // setting values
        for (const p of params) {
          if (p.paramName === 'qr') {
            // Adding qr code
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
          } else {
            try {
              fs.unlinkSync(fileName);
            } catch (error) {
              console.log(error);
            }
            resolve(data);
          }
        });
      } else {
        resolve(null);
      }
    });
  }

  generateQR(docNumber: string) {
    return qr.imageSync(`${process.env.CERT_VERIFY}${docNumber}`, {
      type: 'png',
      ec_level: 'H',
      margin: 1,
    });
  }

  private async fileToBase64(fileName: string) {
    // read binary data
    var bitmap = await fs.readFileSync(fileName);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
  }


  private decodeAndSave(base64str: string, fileName: string) {
    var bitmap = Buffer.from(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(fileName, bitmap);
    console.log('******** File created from base64 encoded string ********');
  }
}
