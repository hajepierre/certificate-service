import { CertificatesService } from './certificates.service';
import { ResponseDTO } from './dtos/response.dto';
import { Body, Controller, Get, Logger, Param, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateCertificateTemplateDTO } from './dtos/create-certificate-template.dto';
import { CertificatesTypeDTO } from './dtos/certificate-type.dto';
import { CertificateTypeDTO } from './dtos/certificates-type.dto';
import { CertificateTemplateParams } from './entities/certificate-template-params.entity';

@Controller('certificates')
export class AppController {

  logger = new Logger("AppController");
  constructor(private readonly appService: AppService, private readonly certificatesService: CertificatesService) { }

  @Get('certificate-types')
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    description: 'List of certificate types',
    type: [CertificatesTypeDTO]
  })
  async getCertificateTypes(): Promise<CertificatesTypeDTO[]> {
    return await this.certificatesService.getCertificateTypes()
  }

  @Post('certificate-types')
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    description: 'Add Certificate Type',
    type: CertificatesTypeDTO
  })
  async addCertificateType(@Body() dto: CertificateTypeDTO): Promise<CertificatesTypeDTO> {
    return await this.certificatesService.addCertificateType(dto)
  }

  @Post('templates')
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    description: 'Configure template',
    type: ResponseDTO
  })
  async configureTemplate(@Body() dto: CreateCertificateTemplateDTO): Promise<ResponseDTO> {
    return await this.certificatesService.configureTemplate(dto)
  }

  @Post('certificate-types/:name')
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: 200,
    description: 'Configure template',
    type: ResponseDTO
  })
  async generateCertificate(@Body() dto: any, @Param('name') name: string, @Res() res) {
    const template = await this.certificatesService.getCertificateByTypeName(name);
    if (template) {
      const retries = 5
      let counter = 0;
      const params: CertificateTemplateParams[] = await this.certificatesService.getTemplateParamsById(template.id)
      let buffer = await this.appService.generateCertificate(template.fileName, params, dto)

      let len = buffer.toString().length

      while (len === 9 && counter <= retries) {
        buffer = await this.appService.generateCertificate(template.fileName, params, dto)
        len = buffer.toString().length
        counter++;
      }
      // Sending response
      res.send(buffer)
    }else{
      res.status(404).send({error:`No template was found associted with certificate type: ${name}`})
    }
  }
}
