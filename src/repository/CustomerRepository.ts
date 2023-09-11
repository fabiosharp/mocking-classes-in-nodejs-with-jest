import { DataSource, Repository } from "typeorm";
import Customer from "../entity/Customer";
import { RetrieveDataSource } from "../infra/database";
import { container } from "../infra/inversify.container";

interface ICustomerRepository {
    
}

class CustomerRepository implements ICustomerRepository {

    dataSource:DataSource;
    repository:Repository<Customer>;

    constructor(callbackDataSource = RetrieveDataSource ){
        this.dataSource = RetrieveDataSource() as DataSource;

        this.repository = this.dataSource.getRepository(Customer);
    }

}

const CustomerRepositorySymbol = Symbol.for("CustomerRepository");

container.bind<ICustomerRepository>(CustomerRepositorySymbol).to(CustomerRepository);

export { CustomerRepository };
export { CustomerRepositorySymbol };
export { ICustomerRepository } ;