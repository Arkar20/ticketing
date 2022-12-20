import request from "supertest";
import app from "../app";
import { Ticket } from "../model";

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

  await request
    .agent(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", desc: "test desc" });

  const ticketsAfterCreate = await Ticket.find({});
  expect(ticketsAfterCreate.length).toEqual(1);
});
