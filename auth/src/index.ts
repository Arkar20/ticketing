import express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true, //allowing only https
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("mongo Connected");
  } catch (error) {
    console.log("Error Connecting to MongoDB");
  }
}

start();

app.listen(3000, () => {
  console.log("Listening on port 3000!!");
});
