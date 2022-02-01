import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Base } from "./base";
import { CertificateTemplateParams } from "./certificate-template-params.entity";
import { CertificateType } from "./certificates-type.entity";

@Entity()
export class CertificateTemplate extends Base {
    @OneToOne(() => CertificateType)
    @JoinColumn()
    type: CertificateType;
    @Column({ unique: true })
    fileName: string;
    @OneToMany(
        () => CertificateTemplateParams,
        param => param.template,
    )
    params: CertificateTemplateParams[];
}