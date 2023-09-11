import Leasing from "../entity/Leasing";
import { ILeasingRepository } from "../repository/LeasingRepository";
import { LeasingService } from "./LeasingService";

const leasingRepository: ILeasingRepository = {
    getLeasingById: jest.fn()
}

beforeEach(() => {

});

test("LeasingService Total Amount returned with success", () => {
    jest.spyOn(leasingRepository, 'getLeasingById')
        .mockImplementation((): Promise<Leasing | null> => {
            const leasing: Leasing = new Leasing();
            leasing.id = 1;
            leasing.idCar = 35;
            leasing.valuesHour = 50;
            leasing.pickupDate = new Date(2023, 7, 25);
            leasing.returnDate = new Date(2023, 8, 25);

            return Promise.resolve(leasing);
        });    

    const service = new LeasingService(leasingRepository);

    service.calculateTotalAmount(1).then((result: { totalAmount: number } | null) => {

        expect(result).not.toBeNull();
        expect(result).toHaveProperty("totalAmount", 37200);
        expect(leasingRepository.getLeasingById).toHaveBeenCalled();

    });

});

test("LeasingService leasing not found", () => {
    jest.spyOn(leasingRepository, 'getLeasingById')
        .mockImplementation((): Promise<Leasing | null> => {
            return Promise.resolve(null);
        });
        
    const service = new LeasingService(leasingRepository);

    service.calculateTotalAmount(1).then((result: { totalAmount: number } | null) => {

        expect(result).toBeNull();
        expect(leasingRepository.getLeasingById).toHaveBeenCalled();

    })
});

test("LeasingService repository throws an error", () => {
    jest.spyOn(leasingRepository, 'getLeasingById')
        .mockImplementation((): Promise<Leasing | null> => {
            return Promise.reject(new Error("Connection is broken"));
        });


    const service = new LeasingService(leasingRepository);

    expect(service.calculateTotalAmount(1)).rejects.toThrow();

});