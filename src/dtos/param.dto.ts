import { ApiProperty } from "@nestjs/swagger";

export class ParamDTO {
    @ApiProperty({ description: 'Parameter name', required: true })
    paramName: string;
    @ApiProperty({ description: 'x coordinate value', required: true })
    xCoordinate: number;
    @ApiProperty({ description: 'y coordinate value', required: true })
    yCoordinate: number;
    @ApiProperty({ description: 'color code', required: false })
    color: string;
    @ApiProperty({ description: 'Font family', required: false })
    font: string;
    @ApiProperty({ description: 'Width', required: false })
    width: number;
    @ApiProperty({ description: 'Height/breadth',required: false })
    breadth: number;
}