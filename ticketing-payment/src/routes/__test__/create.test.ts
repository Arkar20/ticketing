import { OrderStatus } from "@jeffery_microservice/common";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { Order } from "../../model";

it("route exists", async () => {
  const response = await request(app).post("/api/payments");

  expect(response.status).not.toBe(404);
});

it("not unauthorize error if not login", async () => {
  const response1 = await request(app).post("/api/payments");

  expect(response1.status).toBe(401);

  const response2 = await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin());

  expect(response2.status).not.toBe(401);
});

it("show error when there is no token and orderid", async () => {
  const response = await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin());

  expect(response.status).toBe(400);

  expect(response.body[0].message).toBe("Token Is Required");
  expect(response.body[1].message).toBe("Order ID Is Required");
});

it("show error if the owner is not owned the order", async () => {
  const user_id = new mongoose.Types.ObjectId().toString();

  const order1 = await Order.build({
    id: new mongoose.Types.ObjectId().toString(),
    price: 100,
    status: OrderStatus.Created,
    user_id: new mongoose.Types.ObjectId().toString(),
    version: 0,
  }).save();

  const order2 = await Order.build({
    id: new mongoose.Types.ObjectId().toString(),
    price: 100,
    status: OrderStatus.Created,
    user_id,
    version: 0,
  }).save();

  const responseError = await request(app)
    .post("/api/payments")
    .send({
      token: "something",
      order_id: order1.id,
    })
    .set("Cookie", global.signin(user_id));

  expect(responseError.status).toBe(401);
  expect(responseError.body[0].message).toBe("You do not own the order");

  const responseSuccess = await request(app)
    .post("/api/payments")
    .send({
      token: "something",
      order_id: order2.id,
    })
    .set("Cookie", global.signin(user_id));

  expect(responseSuccess.status).not.toBe(401);
});
