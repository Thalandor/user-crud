import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Let's start with the basics...");
});

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
