import request from "supertest";
import app from "../app";
import { Ticket } from "../model";
import mongoose from "mongoose";
it("has a single order route", async () => {
  const res = await request(app).get("/api/orders/1");
  expect(res.status).not.toEqual(404);
});

it("need to pass valid mongoose id", async () => {
  const resOne = await request(app)
    .get("/api/orders/1")
    .set("Cookie", global.signin())
    .send();

  expect(resOne.status).toEqual(500);

  const res = await request(app)
    .get(`/api/orders/${new mongoose.Types.ObjectId()}`)
    .set("Cookie", global.signin())
    .send();

  expect(res.status).not.toEqual(500);
});

it("need to login to retrieve the single order", async () => {
  const res = await request(app)
    .get(`/api/orders/${new mongoose.Types.ObjectId()}`)
    .send();

  expect(res.status).toEqual(401);
});

it("auth user needs to own the order", async () => {
  const ticket = await Ticket.build({
    id: String(new mongoose.Types.ObjectId()),
    desc: "test desc",
    title: "hello title",
    price: 100,
  }).save();

  const userId = global.signin();

  const orderRes = await request(app)
    .post("/api/orders")
    .set("Cookie", userId)
    .send({ ticket_id: ticket.id });

  const res = await request(app)
    .get(`/api/orders/${orderRes.body.id}`)
    .set("Cookie", userId)
    .send();

  expect(res.status).toEqual(200);
  expect(res.body.id).toEqual(orderRes.body.id);
});
