import { ApiProperty } from "@nestjs/swagger";

export class GraduateCertificate { 
    @ApiProperty({  description: 'Year' })
    year: string;

    @ApiProperty({  example:'Mr. Joe Doe', description: 'Full Name, starting with title' })
    fullName: string;

    @ApiProperty({  description: 'Membership class Name' })
    membershipType: string;

    @ApiProperty({  description: 'Discipline' })
    field: string;


    @ApiProperty({  description: 'Signature Date' })
    doneDate: string;
}