import request from "supertest";
import app from "../app";
import { Ticket } from "../model";
it("retrieve all tickets", async () => {
  const data = new Array(10).fill({
    title: "test title",
    desc: "test desc",
    price: 100,
  });

  await Ticket.create(data);

  const res = await request(app).get("/api/tickets");

  expect(res.body.length).toEqual(10);
});
