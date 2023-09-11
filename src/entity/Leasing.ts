import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Customer from "./Customer";

const MILLI_TO_HOURS = 1000 * 60 * 60;

@Entity()
class Leasing{

    @PrimaryGeneratedColumn()
    id!: number

    @JoinColumn({ name: "customer_id" })
    @ManyToOne(()=>Customer, (customer) => customer.leasings)
    customer!: Customer;

    @Column({name:"id_car", type:"int", nullable: false })
    idCar!: number;

    @Column({name:"pickup_date", type:"datetime", nullable: false})
    pickupDate!: Date;

    @Column({name:"return_date", type:"datetime"})
    returnDate!: Date;

    @Column({name:"values_hour", type: "numeric", nullable: false})
    valuesHour!: number;

    @Column({name:"additional_security", type:"boolean", nullable: false})
    additionalSecurity!: boolean;

    @Column({name:"additional_security_value", type: "numeric", nullable: false, default: false})
    additionalSecurityValue!: number;
    
    getTotalHours():number {
        const pick:Date = new Date(this.pickupDate);
        const ret:Date = new Date(this.returnDate);
        const differenceTime:number = Math.abs(ret.getTime() - pick.getTime());
        const hours:number = Math.ceil(differenceTime / MILLI_TO_HOURS)

        return hours;
    }
}

export default Leasing;