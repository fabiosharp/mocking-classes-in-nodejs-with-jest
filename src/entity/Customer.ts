import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Leasing from "./Leasing";

@Entity()
class Customer{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length:50, nullable:false})
    name!: string;

    @Column({type: "varchar", length:250})
    address!: string;

    @Column({name:"licensed_driver", type: "boolean", nullable: false, default: true})
    licensedDriver!: boolean;

    @OneToMany(() => Leasing, (leasing) => leasing.customer)
    leasings!: Leasing[];

}

export default Customer;