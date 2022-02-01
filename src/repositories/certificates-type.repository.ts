import { CertificateTypeDTO } from "src/dtos/certificates-type.dto";
import { CertificateType } from "src/entities/certificates-type.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CertificateType)
export class CertificatesTypeRepository extends Repository<CertificateType>{
    async add(dto: CertificateTypeDTO) {
        const temp = await this.findByName(dto.name);
        if (temp) {
            const id = temp.id
            await this.update({ id }, { params: dto.params });
            return await this.findById(id)
        }
        const entity = await this.create(dto);
        return await this.save(entity);
    }

    async findByName(name: string) {
        return await this.findOne({ where: { name } })
    }

    async findById(id: string) {
        return await this.findOne({ where: { id } })
    }
}