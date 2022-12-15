import { BadRequest } from "@jeffery_microservice/common";
import mongoose from "mongoose";
import app from "./app";

if (!process.env.JWT_SECRET) {
  console.log("JWT Secret Key Not Exists");
}
async function start() {
  try {
    mongoose.set("strictQuery", true);
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
