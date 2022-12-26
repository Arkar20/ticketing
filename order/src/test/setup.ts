import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

jest.mock("../nats-connect");

let mongo: any;

declare global {
  var signin: () => string[];
}
beforeAll(async () => {
  process.env.JWT_SECRET = "test";
  mongo = await MongoMemoryServer.create();
  const mongoURL = mongo.getUri();

  await mongoose.connect(mongoURL);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const payload = {
    id: "123123123",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  const session = { jwt: token };

  const sessionJWT = JSON.stringify(session);

  const sessionB64 = Buffer.from(sessionJWT).toString("base64");

  return [`session=${sessionB64}`];
};
