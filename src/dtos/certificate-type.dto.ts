import { ApiProperty } from "@nestjs/swagger";

export class CertificatesTypeDTO {
    @ApiProperty({ description: 'id', required: true })
    id: string;
    @ApiProperty({ description: 'Name', required: true })
    name: string;
    @ApiProperty({ description: 'Description', required: true })
    description: string;
    @ApiProperty({ description: 'params', required: true })
    params: any;
}