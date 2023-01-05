import { natsWrapper } from "../../../nats-connect";
import { ExpirationCompleteListener } from "../index";
import {
  ExpirationCompleteType,
  OrderStatus,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { Order, Ticket } from "../../../model";

const setUp = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.stan);

  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toString(),
    title: "hello",
    desc: "hello",
    price: 100,
  }).save();

  const expireTime = new Date();
  expireTime.setSeconds(expireTime.getSeconds() + 15 * 60);

  const order = await Order.build({
    expire_at: expireTime,
    ticket: ticket,
    status: OrderStatus.Created,
    user_id: new mongoose.Types.ObjectId().toString(),
  }).save();

  const data: ExpirationCompleteType["data"] = {
    order_id: order.id,
  };
  //   @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it("updates the order status when the event is listened", async () => {
  const { listener, data, msg, order } = await setUp();
  console.log(
    "🚀 ~ file: order-expiration-complete-listener.test.ts:44 ~ it ~ order",
    order
  );

  await listener.onMessage(data, msg);

  const orderUpdate = await Order.findById(order.id);

  expect(orderUpdate!.status).toBe(OrderStatus.Cancelled);
});
it("confirms the msg is recieved", async () => {
  const { listener, data, msg, order } = await setUp();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
it("publish the order cancel event", async () => {
  const { listener, data, msg, order } = await setUp();

  await listener.onMessage(data, msg);

  const eventPublish = JSON.parse(
    (natsWrapper.stan.publish as jest.Mock).mock.calls.slice(-1)[0][1]
  );

  expect(eventPublish.id).toBe(order.id);
});
