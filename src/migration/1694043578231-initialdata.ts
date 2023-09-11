import { MigrationInterface, QueryRunner } from "typeorm"
import * as fs from "fs";

var sqlContent = fs.readFileSync(__dirname + '\/initial.sql').toString()
    .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
    .replace(/\s+/g, ' '); // excess white space
const queries:string[] = sqlContent.split(";");

export class InitialData1694043578231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        for (let sql of queries){
            if (sql.trim().length > 0){
                await queryRunner.query(sql.concat(";"));
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("");
    }

}
