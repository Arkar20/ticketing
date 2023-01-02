import { OrderCreateType, OrderStatus } from "@jeffery_microservice/common";
import mongoose, { now } from "mongoose";
import { Ticket } from "../../../model";
import { natsWrapper } from "../../../nats-connect";
import { OrderCreatedListener } from "../OrderCreatedListener";
import { Message } from "node-nats-streaming";

const setUp = async () => {
  const listener = new OrderCreatedListener(natsWrapper.stan);

  const ticket = await Ticket.build({
    title: "title",
    desc: "desc",
    price: "1",
    user_id: "123123",
  }).save();

  const data: OrderCreateType["data"] = {
    id: String(new mongoose.Types.ObjectId()),
    version: 0,
    user_id: String(new mongoose.Types.ObjectId()),
    status: OrderStatus.Created,
    expire_at: String(now().getSeconds() + 150000),
    ticket: {
      id: ticket.id,
      title: ticket.title,
      desc: ticket.desc,
      price: ticket.price,
    },
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, msg, ticket, data };
};

it("set the order id of the ticket when event trigger", async () => {
  const { listener, data, msg, ticket } = await setUp();

  await listener.onMessage(data, msg);

  const ticketUpdate = await Ticket.findById(ticket.id);

  expect(ticketUpdate!.order_id).toBe(data.id);
});

it("calls the ack fun", async () => {
  const { listener, data, msg } = await setUp();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("emit a ticket update event after creating a order", async () => {
  const { listener, data, msg, ticket } = await setUp();
  console.log("🚀 ~ file: OrderCreatedListener.test.ts:59 ~ it ~ data", data);

  await listener.onMessage(data, msg);

  expect(natsWrapper.stan.publish).toHaveBeenCalled();

  const jestData = JSON.parse(
    (natsWrapper.stan.publish as jest.Mock).mock.calls[0][1]
  );
  console.log(
    "🚀 ~ file: OrderCreatedListener.test.ts:68 ~ it ~ jestData",
    jestData
  );

  // expect(jestData.order_id).toBe(data.id);
});
