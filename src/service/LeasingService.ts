// import { Inject, Service } from "typedi";
import { injectable, inject } from "inversify";
import { container } from "../infra/inversify.container";
import { LeasingRepositorySymbol, ILeasingRepository } from "../repository/LeasingRepository";
import Leasing from "../entity/Leasing";

interface calculatedLeasing {
    totalAmount: number;
    customerName: string;
    carId: number;
}

@injectable()
class LeasingService {

    constructor(
        @inject(LeasingRepositorySymbol)
        private leasingRepository: ILeasingRepository ) {
    }

    async calculateTotalAmount(leasingId: number) {

        return this.leasingRepository.getLeasingById(leasingId)
        .then((leasing: Leasing | null) => {

            if (leasing == null) {
                return null;
            }

            const hours: number = leasing.getTotalHours();
            let result: calculatedLeasing = {
                totalAmount: 0,
                customerName: leasing.customer.name,
                carId: leasing.idCar
            };

            result.totalAmount = hours * leasing.valuesHour;

            if (leasing.additionalSecurity) {
                result.totalAmount += leasing.additionalSecurityValue;
            }

            return result;

        }).catch(reason => {
            throw reason;
        })
    }
}

container.bind<LeasingService>(LeasingService).toSelf();

export { LeasingService };

export { calculatedLeasing };