import chalk from "chalk";
// const express = require("express");
import express from "express";

console.log(chalk.blue("Hello world!"));

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/heartbeat", (req, res) => {
  res.send("❤");
});

app.listen(port, () => {
  console.log(
    chalk.yellowBright(
      `Example app listening on port http://localhost:${port}`,
    ),
  );
});
