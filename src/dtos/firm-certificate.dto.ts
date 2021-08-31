import { ApiProperty } from "@nestjs/swagger";

export class FirmCertificate {
    @ApiProperty({  description: 'Firm Name' })
    companyName: string;

    @ApiProperty({  description: 'Registration Number' })
    registrationNumber: string;

    @ApiProperty({  description: 'expiryDate' })
    expiryDate: string;

    @ApiProperty({  description: 'Council Meeting Date' })
    councilMeetingDate: string;

    @ApiProperty({  description: 'Engineering field' })
    field: string;

    @ApiProperty({  description: 'Signature Date' })
    doneDate: string;
}