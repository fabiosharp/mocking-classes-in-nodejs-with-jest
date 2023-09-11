import { Router, Request, Response } from "express";
import { LeasingService, calculatedLeasing } from "../service/LeasingService";
import { container } from "../infra/inversify.container";

const route = Router();

route.get('/leasing/amount/:leasingId', async (req: Request, res: Response) => {

    let leasingService:LeasingService = container.get<LeasingService>(LeasingService); //= Container.get(LeasingService);
    const leasingId:number = parseInt(req.params.leasingId);

    leasingService.calculateTotalAmount(leasingId)
    .then((result:calculatedLeasing | null) => {

        if (result == null){
            res.statusCode = 404;
            res.json({error: "Leasing not found"});

        } else {
            res.json(result);

        }
        
    }).catch(reason => {
        res.statusCode = 500;
        res.json({error: reason.toString()});
    });
});

export { route };