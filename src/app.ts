import express from "express";
import { router } from "./routes";

export default class App {
  #app: express.Application;
  #server: any;

  constructor() {
    this.#app = express();
  }

  getApp = () => {
    return this.#app;
  };

  start = async () => {
    const port = process.env.EXPRESS_PORT;

    this.#app.use(express.json());
    this.#app.use("/", router);

    this.#server = this.#app.listen(port, () => {
      return console.log(
        `Express server is listening at http://localhost:${port} 🚀`
      );
    });
    this.#server;
  };

  close = () => {
    this.#server.close();
  };
}
