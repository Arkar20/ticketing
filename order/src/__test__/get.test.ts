import request from "supertest";
import app from "../app";
import { Ticket } from "../model";
it("route for single collection exits", async () => {
  const data = new Array(10).fill({
    title: "test title",
    desc: "test desc",
    price: 100,
  });

  const ticket = await Ticket.create(data);

  const res = await request(app).get(`/api/tickets/${ticket}`);

  expect(res.status).not.toEqual(404);
});
it("can retrieve single collection", async () => {
  const data = {
    title: "test title",
    desc: "test desc",
    price: 100,
  };

  const ticket = await Ticket.create(data);

  const res = await request(app).get(`/api/tickets/${ticket}`);

  expect(res.body.title).not.toEqual(ticket.title);
});
