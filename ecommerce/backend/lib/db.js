import {drizzle} from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function setupDb() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
    });
    return drizzle({client: connection},{logging:true});
}

const db = await setupDb();
export default db;
