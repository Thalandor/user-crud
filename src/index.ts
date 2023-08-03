import App from "./app";
import dotenv from "dotenv";

dotenv.config();

async function start() {
  const app = new App();
  app.start();
}

start();
