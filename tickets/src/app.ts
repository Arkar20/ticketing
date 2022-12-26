import express from "express";
import { json } from "body-parser";

import { errorHandler } from "@jeffery_microservice/common";
import "express-async-errors";
import { ticketCreateRouter, ticketGetAllRouter } from "./routes/";

import cookieSession from "cookie-session";
const app = express();
app.set("trust proxy", 1);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(json());
app.use("/api", ticketCreateRouter);
app.use("/api/tickets", ticketGetAllRouter);

app.use(errorHandler);

export default app;
