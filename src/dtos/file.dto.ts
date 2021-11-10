import { ApiProperty } from "@nestjs/swagger";

export class FileDTO {
    @ApiProperty({ description: 'File base 64 text', required: true })
    fileText: string;

    @ApiProperty({ description: 'File Type' })
    type: string;

    @ApiProperty({ description: 'file name' })
    name: string;

    changed?: boolean;

    @ApiProperty({ description: 'Individual|Firm|Graduate', required: true })
    membershipType: string;
}


