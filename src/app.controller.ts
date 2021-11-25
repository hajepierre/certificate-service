import { AckResponseDTO } from './dtos/ack.dto';
import { Body, Controller, Get, Param, Post, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FileDTO } from './dtos/file.dto';
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
  @ApiQuery({ name: 'discipline', required: true, description: 'Discipline' })
  @ApiQuery({ name: 'signatureDate', required: true, description: 'Certificate signature date' })
  @ApiQuery({ name: 'certificateNumber', required: true, description: 'Certificate number' })
  async getFirmCertificates(@Res() res,
    @Query('companyName') companyName: string,
    @Query('registrationNumber') registrationNumber: string,
    @Query('councilMeetingDate') councilMeetingDate: string,
    @Query('expiryDate') expiryDate: string,
    @Query('discipline') discipline: string,
    @Query('signatureDate') signatureDate: string,
    @Query('certificateNumber') certificateNumber: string
  ) {
    const dto: FirmCertificate = {
      companyName,
      registrationNumber,
      councilMeetingDate,
      expiryDate,
      field: discipline,
      doneDate: signatureDate,
      certificateNumber
    }
    const retries = 5
    let counter = 0;
    let buffer = await this.appService.generatePracticingFirmCertificate(dto);
    let len = buffer.toString().length
    while (len === 9 && counter <= retries) {
      buffer = await this.appService.generatePracticingFirmCertificate(dto);
      len = buffer.toString().length
      counter++;
    }

    res.send(buffer)

  }

  @Get('individual')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Generate Certificate for individuals' })
  @ApiQuery({ name: 'year', required: true, description: 'Certified Year' })
  @ApiQuery({ name: 'fullName', required: true, description: 'Member full Name starting with Title' })
  @ApiQuery({ name: 'membershipClassName', required: true, description: 'Membership Class Name' })
  @ApiQuery({ name: 'registrationNumber', required: true, description: 'Registration Number' })
  @ApiQuery({ name: 'discipline', required: true, description: 'Discipline' })
  @ApiQuery({ name: 'expiryDate', required: true, description: 'Expiry Date' })
  @ApiQuery({ name: 'signatureDate', required: true, description: 'Certificate signature date' })
  @ApiQuery({ name: 'certificateNumber', required: true, description: 'Certificate number' })
  async generateIndividualCertificates(@Res() res,
    @Query('year') year: string,
    @Query('fullName') fullName: string,
    @Query('membershipClassName') membershipClassName: string,
    @Query('registrationNumber') registrationNumber: string,
    @Query('discipline') discipline: string,
    @Query('expiryDate') expiryDate: string,
    @Query('signatureDate') signatureDate: string,
    @Query('certificateNumber') certificateNumber: string) {
    const dto: IndividualCertificate = {
      year,
      fullName,
      membershipType: membershipClassName,
      field: discipline,
      expiryDate,
      doneDate: signatureDate,
      registrationNumber,
      certificateNumber
    }
    const retries = 5
    let counter = 0;
    let buffer = await this.appService.generatePracticingIndividualCertificate(dto)
    let len = buffer.toString().length

    while (len === 9 && counter <= retries) {
      buffer = await this.appService.generatePracticingIndividualCertificate(dto);
      len = buffer.toString().length
      counter++;
    }

    res.send(buffer)
  }

  @Get('graduates')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Generate Certificate for non-practicing graduates' })
  @ApiQuery({ name: 'year', required: true, description: 'Certified Year' })
  @ApiQuery({ name: 'fullName', required: true, description: 'Member full Name starting with Title' })
  @ApiQuery({ name: 'membershipClassName', required: true, description: 'Membership Class Name' })
  @ApiQuery({ name: 'discipline', required: true, description: 'Discipline' })
  @ApiQuery({ name: 'signatureDate', required: true, description: 'Certificate signature date' })
  @ApiQuery({ name: 'certificateNumber', required: true, description: 'Certificate number' })
  async generateGraduatesCertificates(@Res() res,
    @Query('year') year: string,
    @Query('fullName') fullName: string,
    @Query('membershipClassName') membershipClassName: string,
    @Query('discipline') discipline: string,
    @Query('signatureDate') signatureDate: string,
    @Query('certificateNumber') certificateNumber: string) {
    const dto: GraduateCertificate = {
      year,
      fullName,
      membershipType: membershipClassName,
      field: discipline,
      doneDate: signatureDate,
      certificateNumber
    }
    const retries = 5
    let counter = 0;
    let buffer = await this.appService.generateNonPracticingCertificate(dto)
    let len = buffer.toString().length

    while (len === 9 && counter <= retries) {
      buffer = await this.appService.generateNonPracticingCertificate(dto);
      len = buffer.toString().length
      counter++;
    }

    res.send(buffer)
  }

  @Get('templates')
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    description: 'List of certificate templates',
    type: [FileDTO]
  })
  async getTemplates(): Promise<FileDTO[]> {
    return await this.appService.getTemplates()
  }

  @Get('templates/:membershipType')
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    description: 'List of certificate templates',
    type: FileDTO
  })
  async getTemplateByMembershipType(@Param('membershipType') membershipType: string): Promise<FileDTO | AckResponseDTO> {
    return await this.appService.getTemplate(membershipType)
  }

  @Post('templates/upload')
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    description: 'List of certificate templates',
    type: AckResponseDTO
  })
  async uploadTemplate(@Body() dto: FileDTO): Promise<AckResponseDTO> {
    return await this.appService.uploadTemplate(dto)
  }
}
