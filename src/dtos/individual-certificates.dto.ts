import { ApiProperty } from "@nestjs/swagger";

export class IndividualCertificate {
    @ApiProperty({  description: 'Practicing Year' })
    year: string;

    @ApiProperty({  example:'Mr. Joe Doe', description: 'Full Name, starting with title' })
    fullName: string;

    @ApiProperty({  description: 'Membership class Name' })
    membershipType: string;

    @ApiProperty({  description: 'Discipline' })
    field: string;

    @ApiProperty({  description: 'Registration Number' })
    registrationNumber: string;

    @ApiProperty({  description: 'Expiry Date' })
    expiryDate: string;

    @ApiProperty({  description: 'Signature Date' })
    doneDate: string;

    @ApiProperty({  description: 'Certificate Number' })
    certificateNumber: string;
}