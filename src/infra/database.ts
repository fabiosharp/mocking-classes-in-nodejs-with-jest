import { DataSource } from "typeorm"
import Customer from "../entity/Customer";
import Leasing from "../entity/Leasing";
import { InitialData1694043578231 } from "../migration/1694043578231-initialdata";

export default new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Customer, Leasing],
    migrations: [InitialData1694043578231],
    subscribers: [],
});

export const SaveDataSource = (ds: DataSource) => {
    let glb = global as typeof globalThis & {
        __DATA_SOURCE__:DataSource;
    }

    glb.__DATA_SOURCE__ = ds;
}

export const RetrieveDataSource = ():DataSource => {
    let glb = global as typeof globalThis & {
        __DATA_SOURCE__:DataSource;
    }

    const ds: DataSource = glb.__DATA_SOURCE__;
    
    return ds;
}