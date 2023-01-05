import express from "express";

const app = express();

import { natsWrapper, natsWrapper as NatsWrapper } from "./nats-connect";
async function start() {
  if (!process.env.JWT_SECRET) {
    console.log("JWT Secret Key Not Exists");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("Error Connecting to Mongo");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID not defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL not defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID not defined");
  }
  try {
    await NatsWrapper.connect();

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
  console.log("running in port 3000");
});
