import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consortium } from "./consortium.entity";

@Entity({
    name: 'organization'
})
export class Organization {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        type: 'text'
    })
    name: string;

    @ManyToMany(type => Consortium, consortium => consortium.organizations)
    @JoinTable()
    consortiums: Consortium[];
}
