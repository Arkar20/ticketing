import { OrderCreateType, OrderStatus } from "@jeffery_microservice/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../model";
import { natsWrapper } from "../../../nats-connect";
import { OrderCreatedListener } from "../OrderCreatedListener";

const setUp = async () => {
  const listener = new OrderCreatedListener(natsWrapper.stan);

  //   const order = await Order.build({}).save();

  const data: OrderCreateType["data"] = {
    id: new mongoose.Types.ObjectId().toString(),
    version: 0,
    status: OrderStatus.Created,
    user_id: new mongoose.Types.ObjectId().toString(),
    expire_at: new Date().toString(),
    ticket: {
      desc: "hello",
      id: new mongoose.Types.ObjectId().toString(),
      price: 100,
      title: "hello title",
    },
  };

  //   @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("create the order in db when event trigger", async () => {
  const { listener, data, msg } = await setUp();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);
  expect(order!.id).toBe(data.id);
  expect(order!.price).toBe(data.ticket.price);
  expect(msg.ack).toHaveBeenCalled();
});
