import express from "express";
import { router } from "./routes";

export default class App {
  #app: express.Application;

  constructor() {
    this.#app = express();
  }

  start = async () => {
    const port = 3000;

    this.#app.use(express.json());
    this.#app.use("/", router);

    this.#app.listen(port, () => {
      return console.log(
        `Express server is listening at http://localhost:${port} 🚀`
      );
    });
  };
}
