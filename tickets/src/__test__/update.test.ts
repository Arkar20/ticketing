import request from "supertest";
import app from "../app";
import { Ticket } from "../model";

it("has update route", async () => {
  const data = {
    title: "test title",
    desc: "test desc",
    price: 100,
  };

  const ticket = await Ticket.create(data);
  const res = await await request(app).put(`/api/tickets/${ticket.id}`).send({
    title: "test title update",
  });

  expect(res.status).not.toEqual(404);
});
it("can update ticket", async () => {
  const data = {
    title: "test title",
    desc: "test desc",
    price: 100,
  };

  const ticket = await Ticket.create(data);

  const res = await await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "test title update",
      desc: "",
      price: 10,
    });

  expect(res.body.title).toEqual("test title update");
});
