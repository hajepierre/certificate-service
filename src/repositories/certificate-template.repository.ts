import { CertificatesDTO } from "src/dtos/certificates.dto";
import { CertificateTemplate } from "src/entities/certificate-template.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CertificateTemplate)
export class CertificateTemplateRepository extends Repository<CertificateTemplate>{

    async add(dto: CertificatesDTO) {
        const temp = await this.findByTypeId(dto.typeId);
        if (temp) {
            const id = temp.id
            const data = {
                fileName: dto.fileName
            }
            await this.update({ id }, data);
            return await this.findById(id)
        }
        const entity = await this.create({
            type: { id: dto.typeId },
            fileName: dto.fileName
        });
        return await this.save(entity);
    }

    async findByTypeId(id: string) {
        return await this.findOne({ where: { type: { id } }, relations: ['type'] })
    }

    async findById(id: string) {
        return await this.findOne({ where: { id }, relations: ['type'] })
    }
}