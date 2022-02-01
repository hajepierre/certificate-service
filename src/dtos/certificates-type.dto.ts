import { ApiProperty } from "@nestjs/swagger";

export class CertificateTypeDTO {
    @ApiProperty({ description: 'Name of certificate type. Ensure the name does not have white spaces in it', required: true, example: 'firmCertificate' })
    name: string;
    @ApiProperty({ description: 'Certificate for companies' })
    description?: string;
    @ApiProperty({ description: 'certificate specific params', example: {'year':'', 'discripline':''} })
    params: any;
}