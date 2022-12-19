import express from "express";
import { json } from "body-parser";

import { errorHandler } from "@jeffery_microservice/common";
import "express-async-errors";
import ticketRouter from "./routes/tickets";

import cookieSession from "cookie-session";
const app = express();
app.set("trust proxy", true);

app.use(json());
app.use("/api", ticketRouter);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(errorHandler);

export default app;
