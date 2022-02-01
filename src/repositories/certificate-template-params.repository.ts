import { CertificatesParamDTO } from "src/dtos/certificates-param.dto";
import { CertificateTemplateParams } from "src/entities/certificate-template-params.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CertificateTemplateParams)
export class CertificateTemplateParamsRepository extends Repository<CertificateTemplateParams>{
    async add(dto: CertificatesParamDTO) {
        const { templateId, paramName, xCoordinate, yCoordinate, color, font } = dto;
        const temp = await this.findByCertificateId(dto.templateId);
        if (temp) {
            const id = temp.id;
            const data = {
                paramName,
                xCoordinate,
                yCoordinate,
                color,
                font
            }
            await this.update({ id }, data);
            return await this.findById(id)
        }

        const entity = await this.create({
            template: { id: templateId },
            paramName,
            xCoordinate,
            yCoordinate,
            color,
            font
        });
        return await this.save(entity);
    }

    async findByCertificateId(id: string) {
        return await this.findOne({ where: { certificate: { id } }, order: { createdAt: 'DESC' } })
    }

    async findById(id: string) {
        return await this.findOne({ where: { id } })
    }
}