import { Column, Entity } from "typeorm";
import { Base } from "./base";

@Entity()
export class CertificateType extends Base {
    @Column({ length: 50, unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column('json')
    params: any;
}