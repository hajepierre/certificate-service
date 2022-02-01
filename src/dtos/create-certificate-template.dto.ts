import { ApiProperty } from "@nestjs/swagger";
import { FileDTO } from "./file.dto";
import { ParamDTO } from "./param.dto";

export class CreateCertificateTemplateDTO {
    @ApiProperty({ description: 'Certificate Type Id', required: true })
    typeId: string;
    @ApiProperty({ description: 'File data', required: true })
    file: FileDTO;
    @ApiProperty({
        description: 'Template parameters', required: true, example: [
            {
                "paramName": "discipline",
                "xCoordinate": 11,
                "yCoordinate": 20,
                "color": "ffaa00",
                "font": "italic",
                "width": 100,
                "breadth": 210
            }
        ]
    })
    params: ParamDTO[]
}