import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { Ticket, Order } from "../model";
import { OrderStatus } from "@jeffery_microservice/common";

const buildTicket = async () => {
  const res = await Ticket.build({
    desc: "test desc",
    title: "hello title",
    price: 100,
  }).save();

  return res;
};
it("has route for  order lists", async () => {
  const res = await request(app).get("/api/orders").send();

  expect(res.status).not.toEqual(404);
});
it("retrieves all orders of the auth user", async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signin("userId141234");
  const userTwo = global.signin("userId9888");

  const orderOneRes = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticket_id: ticketOne._id });

  const orderTwoRes = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticket_id: ticketTwo._id });

  const orderThreeRes = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticket_id: ticketThree._id });

  if (
    [orderOneRes.status, orderTwoRes.status, orderThreeRes.status].includes(201)
  ) {
    const res = await request(app)
      .get("/api/orders")
      .set("Cookie", userTwo)
      .send({});

    expect(res.status).toEqual(200);
    expect(res.body[0].id).toEqual(orderTwoRes.body.id);
    expect(res.body[1].id).toEqual(orderThreeRes.body.id);
  }
});
