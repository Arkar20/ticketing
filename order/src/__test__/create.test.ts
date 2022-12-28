import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { Ticket } from "../model";
import { natsWrapper } from "../nats-connect";

it("has route for create order", async () => {
  const res = await request(app).post("/api/orders").send();

  expect(res.status).not.toEqual(404);
});

it("show error when ticket id is not correct format", async () => {
  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket_id: "123" });

  expect(res.status).toEqual(400);
});

it("show not found error when ticket is not found in db", async () => {
  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket_id: new mongoose.Types.ObjectId() });

  expect(res.status).toEqual(400);
  expect(res.body[0].message).toEqual("No Ticket is Found");
});

it("can create ticket", async () => {
  const ticket = await Ticket.build({
    desc: "test desc",
    title: "hello title",
    price: 100,
  }).save();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket_id: ticket.id });

  expect(res.status).toEqual(201);
  expect(res.body.ticket.id).toEqual(ticket.id);
});

it("emit the order created event", async () => {
  const ticket = await Ticket.build({
    desc: "test desc",
    title: "hello title",
    price: 100,
  }).save();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticket_id: ticket.id });

  expect(natsWrapper.stan.publish).toHaveBeenCalled();
});
