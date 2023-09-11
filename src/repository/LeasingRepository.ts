import { DataSource, Repository } from "typeorm";
import Leasing from "../entity/Leasing";
import { RetrieveDataSource } from "../infra/database";
import { injectable } from "inversify";
import { container } from "../infra/inversify.container";

interface ILeasingRepository {
    getLeasingById(leasingId: number):Promise<Leasing | null>;
}

@injectable()
class LeasingRepository implements ILeasingRepository {
    
    dataSource:DataSource;
    repository:Repository<Leasing>;

    constructor(callbackDataSource = RetrieveDataSource ){
        this.dataSource = RetrieveDataSource() as DataSource;

        this.repository = this.dataSource.getRepository(Leasing);
    }

    public getLeasingById(leasingId: number):Promise<Leasing | null> {
        return this.repository.findOne({
            where: { id: leasingId },
            relations: {
                customer: true
            }
        });
    }

};

const LeasingRepositorySymbol = Symbol.for("LeasingRepository");

container.bind<ILeasingRepository>(LeasingRepositorySymbol).to(LeasingRepository);

export { LeasingRepository };
export { LeasingRepositorySymbol };
export { ILeasingRepository } ;