import express from "express";

import { route as leasingRoute } from "../controller/LeasingController";

const DEFAULT_ROOT = "/api";

const app = express();

app.use(express.json());

app.use( function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(DEFAULT_ROOT, leasingRoute);

export default app;