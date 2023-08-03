import express from "express";
import { router } from "./routes";
import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const start = async () => {
  const app = express();
  const port = 3000;

  const pgp = pgPromise();
  const dbConfig = {
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
  };
  const db = pgp(dbConfig);

  app.use("/", router);

  app.listen(port, () => {
    return console.log(
      `Express server is listening at http://localhost:${port} 🚀`
    );
  });
};

start();
