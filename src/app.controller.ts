import { Body, Controller, Get, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FirmCertificate } from './dtos/firm-certificate.dto';
import { GraduateCertificate } from './dtos/graduate-certificate.dto';
import { IndividualCertificate } from './dtos/individual-certificates.dto';

@Controller('api/v1/certificates')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('firm')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Generate Certificate for firms' })
  generateFirmCertificates(@Res() res, @Body() dto: FirmCertificate) {
    this.appService.generatePracticingFirmCertificate(dto).then(buffer => {
      res.send(buffer)
    })
  }

  @Post('individual')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Generate Certificate for individuals' })
  generateIndividualCertificates(@Res() res, @Body() dto: IndividualCertificate) {
    this.appService.generatePracticingIndividualCertificate(dto).then(buffer => {
      res.send(buffer)
    })
  }

  @Post('graduates')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Generate Certificate for non-practicing graduates' })
  generateGraduatesCertificates(@Res() res, @Body() dto: GraduateCertificate) {
    this.appService.generateNonPracticingCertificate(dto).then(buffer => {
      res.send(buffer)
    })
  }
}
