import {
  OrderCancelType,
  OrderCreateType,
  OrderStatus,
} from "@jeffery_microservice/common";
import mongoose, { now } from "mongoose";
import { Ticket } from "../../../model";
import { natsWrapper } from "../../../nats-connect";
import { OrderCancelledListener } from "../OrderCancelledListener";
import { Message } from "node-nats-streaming";

const setUp = async () => {
  const listener = new OrderCancelledListener(natsWrapper.stan);

  const ticket = await Ticket.build({
    title: "title",
    desc: "desc",
    price: 11,
    user_id: "123123",
  }).save();

  const data: OrderCancelType["data"] = {
    id: new mongoose.Types.ObjectId().toString(),
    version: ticket.version,
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

  expect(ticketUpdate!.order_id).not.toBeDefined();

  expect(msg.ack).toHaveBeenCalled();

  expect(natsWrapper.stan.publish).toHaveBeenCalled();
});
