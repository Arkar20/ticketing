import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { Ticket } from "../model";

it("has route for create order", async () => {
  const res = await request(app).get("/api/orders").send();

  expect(res.status).not.toEqual(404);
});
it("recieve all orders", async () => {
  const res = await request(app).get("/api/orders").send();

  expect(res.status).not.toEqual(404);
});
