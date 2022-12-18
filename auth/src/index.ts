import { BadRequest } from "@jeffery_microservice/common";
import mongoose from "mongoose";
import app from "./app";

async function start() {
  if (!process.env.JWT_SECRET) {
    throw new BadRequest("JWT Secret Key Not Exists");
  }
  if (!process.env.MONGO_URL) {
    throw Error("Mongo Env needs to be defined");
  }
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongo Connected");
  } catch (error) {
    console.log("Error Connecting to MongoDB");
  }
}

start();

app.listen(3000, () => {
  console.log("Listening on port 3000!!");
});
