import request from "supertest";
import app from "../app";
import { Ticket } from "../model";
import mongoose from "mongoose";
import { OrderStatus } from "@jeffery_microservice/common";
import { natsWrapper } from "../nats-connect";

it("has a delete order route", async () => {
  const res = await request(app).delete("/api/orders/1");
  expect(res.status).not.toEqual(404);
});

it("need to pass valid mongoose id", async () => {
  const resOne = await request(app)
    .delete("/api/orders/1")
    .set("Cookie", global.signin())
    .send();

  expect(resOne.status).toEqual(400);

  const res = await request(app)
    .delete(`/api/orders/${new mongoose.Types.ObjectId()}`)
    .set("Cookie", global.signin())
    .send();

  expect(res.status).toEqual(400);
});

it("need to login to delete the single order", async () => {
  const res = await request(app)
    .get(`/api/orders/${new mongoose.Types.ObjectId()}`)
    .send();

  expect(res.status).toEqual(401);
});

it("auth user needs to own the order to delete", async () => {
  const ticket = await Ticket.build({
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
    .delete(`/api/orders/${orderRes.body.id}`)
    .set("Cookie", userId)
    .send();

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual(OrderStatus.Cancelled);
});

it("emit the order cancelled event", async () => {
  const ticket = await Ticket.build({
    desc: "test desc",
    title: "hello title",
    price: 100,
  }).save();

  const userId = global.signin();

  const orderRes = await request(app)
    .post("/api/orders")
    .set("Cookie", userId)
    .send({ ticket_id: ticket.id });

  await request(app)
    .delete(`/api/orders/${orderRes.body.id}`)
    .set("Cookie", userId)
    .send();

  expect(natsWrapper.stan.publish).toHaveBeenCalled();
});
