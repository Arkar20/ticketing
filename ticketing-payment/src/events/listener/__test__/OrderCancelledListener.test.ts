import { OrderCancelType, OrderStatus } from "@jeffery_microservice/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../model";
import { natsWrapper } from "../../../nats-connect";
import { OrderCancelledListener } from "../OrderCancelledListener";
const setUp = async () => {
  const listener = new OrderCancelledListener(natsWrapper.stan);

  const order = await Order.build({
    id: new mongoose.Types.ObjectId().toString(),
    version: 0,
    price: 100,
    status: OrderStatus.Created,
    user_id: new mongoose.Types.ObjectId().toString(),
  }).save();

  const data: OrderCancelType["data"] = {
    id: order.id,
    version: 0,
    ticket: {
      desc: "hello dec",
      id: new mongoose.Types.ObjectId().toString(),
      title: "hello title",
      price: order.price,
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
  expect(order!.status).toBe(OrderStatus.Cancelled);

  expect(msg.ack).toHaveBeenCalled();
});
