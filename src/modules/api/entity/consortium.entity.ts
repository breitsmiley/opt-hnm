import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./organization.entity";

@Entity({
    name: 'consortium'
})
export class Consortium {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        type: 'text'
    })
    name: string;

    @ManyToMany(type => Organization, organization => organization.consortiums)
    organizations: Organization[];
}
