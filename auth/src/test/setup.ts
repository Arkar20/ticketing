import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
let mongo: any;

declare global {
  var signin: () => Promise<string[]>;
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

global.signin = async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "iam12years",
    })
    .expect(201);

  return authResponse.get("Set-Cookie");
};
