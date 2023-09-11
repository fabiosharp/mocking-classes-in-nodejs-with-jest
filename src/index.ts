import "reflect-metadata";
import AppDataSource, { SaveDataSource } from "./infra/database";
import { Application, Express } from "express";

AppDataSource.initialize().then(async () => {
    
    SaveDataSource(AppDataSource);

    console.log("Database connection established ")

    const app:Express = (await import('./infra/express')).default;
    
    app.listen(3000, ()=>{
        console.log("Application is ready and listening");
    });

}).catch(error => console.log(error))

console.log('Application is running');    