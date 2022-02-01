import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Base } from "./base";
import { CertificateTemplate } from "./certificate-template.entity";

@Entity()
export class CertificateTemplateParams extends Base {

    @ManyToOne(
        () => CertificateTemplate,
        template => template.params,
        {
            nullable: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'template_id' })
    template: CertificateTemplate;
    @Column()
    paramName: string;
    @Column("integer")
    xCoordinate: number;
    @Column("integer")
    yCoordinate: number;
    @Column({ nullable: true })
    color: string;
    // @Column({ nullable: true })
    // font: string;
    @Column({ nullable: true })
    fontSize: number;
    @Column({ nullable: true })
    width: number;
    @Column({ nullable: true })
    breadth: number;
}