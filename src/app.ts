import express from "express";
import { router } from "./routes";
import { db } from "./db/db";

export default class App {
  #app: express.Application;

  constructor() {
    this.#app = express();
  }

  getApp = () => {
    return this.#app;
  };

  start = async () => {
    // Middlewares
    this.#app.use(express.json());

    // Set routes
    this.#app.use("/", router);

    // As the test run in parallel we need to avoid port collision.
    if (process.env.NODE_ENV !== "test") {
      try {
        await db.connect();
        console.log("Connected to the database.");
        const port = process.env.EXPRESS_PORT;
        this.#app.listen(port, () => {
          return console.log(
            `Express server is listening at http://localhost:${port} 🚀`
          );
        });
      } catch (error) {
        console.error("Error connecting to the database:", error);
      }
    }
  };
}
