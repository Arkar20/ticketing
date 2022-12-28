import express from "express";
import { json } from "body-parser";

import { errorHandler } from "@jeffery_microservice/common";
import "express-async-errors";
import {
  orderCreateRoute,
  orderGetAllRouter,
  orderUpdateRoute,
  orderDeleteRoute,
  orderSingleRouter,
} from "./routes/";

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
app.use("/api/", orderGetAllRouter);
app.use("/api", orderCreateRoute);
app.use("/api/", orderSingleRouter);
app.use("/api/", orderUpdateRoute);
app.use("/api/", orderDeleteRoute);

app.use(errorHandler);

export default app;
