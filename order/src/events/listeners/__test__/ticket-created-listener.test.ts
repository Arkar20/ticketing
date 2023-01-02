import { natsWrapper } from "../../../nats-connect";
import { TicketCreatedListener } from "../index";
import { TicketCreatedType } from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { Ticket } from "../../../model";

const setUp = async () => {
  const listener = new TicketCreatedListener(natsWrapper.stan);

  const data: TicketCreatedType["data"] = {
    desc: "test",
    id: String(new mongoose.Types.ObjectId()),
    title: "test title",
    price: "100",
    version: 0,
  };

  //   @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("create a ticket when the event is trigger", async () => {
  const { listener, msg, data } = await setUp();

  await listener.onMessage(data, msg);

  const ticket = await Ticket.findById(data.id);

  expect(ticket!.id).toBe(data.id);
  expect(ticket!.title).toBe(data.title);
  expect(ticket!.desc).toBe(data.desc);
});

it("acks the msg", async () => {
  const { listener, msg, data } = await setUp();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
