import { CertificatesParamDTO } from "src/dtos/certificates-param.dto";
import { CertificateTemplateParams } from "src/entities/certificate-template-params.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CertificateTemplateParams)
export class CertificateTemplateParamsRepository extends Repository<CertificateTemplateParams>{
    async add(dto: CertificatesParamDTO) {
        const { templateId, paramName, xCoordinate, yCoordinate, color, fontSize } = dto;
        const temp = await this.findByTemplateIdAndParamName(dto.templateId, paramName);
        if (temp) {
            const id = temp.id;
            const data = {
                paramName,
                xCoordinate,
                yCoordinate,
                color,
                fontSize
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
            fontSize
        });
        return await this.save(entity);
    }

    async findByTemplateId(id: string) {
        return await this.find({ where: { template: { id } } })
    }
    async findByTemplateIdAndParamName(id: string, name: string) {
        return await this.findOne({ where: { template: { id }, paramName: name } })
    }

    async findById(id: string) {
        return await this.findOne({ where: { id } })
    }
}