import { BadRequest } from "@jeffery_microservice/common";
import mongoose from "mongoose";
import app from "./app";
import NatsWrapper from "./nats-connect";
async function start() {
  if (!process.env.JWT_SECRET) {
    console.log("JWT Secret Key Not Exists");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("Error Connecting to Mongo");
  }
  try {
    await NatsWrapper.connect();
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongo Connected");

    NatsWrapper.stan.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    //kill nats if error
    process.on("SIGINT", () => NatsWrapper.stan.close());
    process.on("SIGTERM", () => NatsWrapper.stan.close());
  } catch (error) {
    console.log(error);
  }
}

start();

app.listen(3000, () => {
  console.log("Listening on port 3000!!");
});
