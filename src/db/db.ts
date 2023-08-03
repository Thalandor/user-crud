import pgPromise, { IDatabase, IMain } from "pg-promise";

const pgp: IMain = pgPromise();

const dbConfig = {
  host: process.env.DB_HOST || "",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  database: process.env.DB_NAME || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
};

const db: IDatabase<any> = pgp(dbConfig);

export { db };
