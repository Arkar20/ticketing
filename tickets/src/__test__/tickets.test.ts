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
it("only login user can access the route", () => {
  request
    .agent(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send()
    .end((err, response) => {
      expect(response.status).toEqual(200);
    });
});
it("can create ticket", async () => {
  const tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  request
    .agent(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", desc: "test desc" })
    .end((err, res) => {
      expect(tickets.length).toEqual(1);
    });
});
