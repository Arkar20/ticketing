import request from "supertest";
import app from "../app";
import { Ticket } from "../model";
import { natsWrapper } from "../nats-connect";

it("has a route that returns all tickets", async () => {
  const response = await request(app).post("/api/tickets");

  expect(response.status).not.toEqual(404);
});
it("requires to login first", async () => {
  const response = await request(app).post("/api/tickets");

  expect(response.status).toEqual(401);
});

it("can create ticket", async () => {
  const tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const response = await request
    .agent(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", desc: "test desc", price: "100" });

  const ticketsAfterCreate = await Ticket.find({});
  expect(ticketsAfterCreate.length).toEqual(1);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asldkjf",
      desc: "",
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "laskdfj",
    })
    .expect(400);
});

it("publish an event after create a ticket", async () => {
  const response = await request
    .agent(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", desc: "test desc", price: 100 });

  const ticketsAfterCreate = await Ticket.find({});
  expect(ticketsAfterCreate.length).toEqual(1);

  expect(natsWrapper.stan.publish).toHaveBeenCalled();
});
