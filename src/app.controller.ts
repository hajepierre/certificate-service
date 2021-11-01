import { Controller, Get, Post, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FirmCertificate } from './dtos/firm-certificate.dto';
import { GraduateCertificate } from './dtos/graduate-certificate.dto';
import { IndividualCertificate } from './dtos/individual-certificates.dto';

@Controller('certificates')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('firm')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Generate Certificate for firms' })
  @ApiQuery({ name: 'companyName', required: true, description: 'Company Name' })
  @ApiQuery({ name: 'registrationNumber', required: true, description: 'Registration Number' })
  @ApiQuery({ name: 'councilMeetingDate', required: true, description: 'Council Meeting Date' })
  @ApiQuery({ name: 'expiryDate', required: true, description: 'Expiry Date' })
  @ApiQuery({ name: 'displine', required: true, description: 'Discipline' })
  @ApiQuery({ name: 'signatureDate', required: true, description: 'Certificate signature date' })
  getFirmCertificates(@Res() res,
    @Query('companyName') companyName: string,
    @Query('registrationNumber') registrationNumber: string,
    @Query('councilMeetingDate') councilMeetingDate: string,
    @Query('expiryDate') expiryDate: string,
    @Query('displine') displine: string,
    @Query('signatureDate') signatureDate: string
  ) {
    const dto: FirmCertificate = {
      companyName,
      registrationNumber,
      councilMeetingDate,
      expiryDate,
      field: displine,
      doneDate: signatureDate
    }
    this.appService.generatePracticingFirmCertificate(dto).then(buffer => {
      res.send(buffer)
    })
  }

  @Get('individual')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Generate Certificate for individuals' })
  @ApiQuery({ name: 'year', required: true, description: 'Certified Year' })
  @ApiQuery({ name: 'fullName', required: true, description: 'Member full Name starting with Title' })
  @ApiQuery({ name: 'membershipClassName', required: true, description: 'Membership Class Name' })
  @ApiQuery({ name: 'registrationNumber', required: true, description: 'Registration Number' })
  @ApiQuery({ name: 'displine', required: true, description: 'Discipline' })
  @ApiQuery({ name: 'expiryDate', required: true, description: 'Expiry Date' })
  @ApiQuery({ name: 'signatureDate', required: true, description: 'Certificate signature date' })
  generateIndividualCertificates(@Res() res,
    @Query('year') year: string,
    @Query('fullName') fullName: string,
    @Query('membershipClassName') membershipClassName: string,
    @Query('registrationNumber') registrationNumber: string,
    @Query('displine') displine: string,
    @Query('expiryDate') expiryDate: string,
    @Query('signatureDate') signatureDate: string) {
    const dto: IndividualCertificate = {
      year,
      fullName,
      membershipType: membershipClassName,
      field: displine,
      expiryDate,
      doneDate: signatureDate,
      registrationNumber
    }
    this.appService.generatePracticingIndividualCertificate(dto).then(buffer => {
      res.send(buffer)
    })
  }

  @Get('graduates')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Generate Certificate for non-practicing graduates' })
  @ApiQuery({ name: 'year', required: true, description: 'Certified Year' })
  @ApiQuery({ name: 'fullName', required: true, description: 'Member full Name starting with Title' })
  @ApiQuery({ name: 'membershipClassName', required: true, description: 'Membership Class Name' })
  @ApiQuery({ name: 'displine', required: true, description: 'Discipline' })
  @ApiQuery({ name: 'signatureDate', required: true, description: 'Certificate signature date' })
  generateGraduatesCertificates(@Res() res,
    @Query('year') year: string,
    @Query('fullName') fullName: string,
    @Query('membershipClassName') membershipClassName: string,
    @Query('displine') displine: string,
    @Query('signatureDate') signatureDate: string) {
    const dto: GraduateCertificate = {
      year,
      fullName,
      membershipType: membershipClassName,
      field: displine,
      doneDate: signatureDate
    }
    this.appService.generateNonPracticingCertificate(dto).then(buffer => {
      res.send(buffer)
    })
  }
}
