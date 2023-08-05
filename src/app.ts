import express from "express";
import { router } from "./routes";

export default class App {
  #app: express.Application;

  constructor() {
    this.#app = express();
  }

  getApp = () => {
    return this.#app;
  };

  start = async () => {
    this.#app.use(express.json());
    this.#app.use("/", router);

    if (process.env.NODE_ENV !== "test") {
      const port = process.env.EXPRESS_PORT;
      this.#app.listen(port, () => {
        return console.log(
          `Express server is listening at http://localhost:${port} 🚀`
        );
      });
    }
  };
}
