import dotenv from "dotenv";

import express from "express";

import { apiRouter } from "../routes/index";

dotenv.config();

const app = express();

// allow cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/api/v1", apiRouter);

// ping
app.get("/ping", (req, res) => {
  res.send("pong");
});

export default app;
