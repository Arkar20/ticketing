import { natsWrapper } from "../../../nats-connect";
import { TicketUpdatedListener } from "../index";
import { TicketUpdatedType } from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { Ticket } from "../../../model";

const setUp = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.stan);

  const ticket = await Ticket.build({
    id: String(new mongoose.Types.ObjectId()),
    title: "test",
    desc: "test",
    price: 10,
  }).save();

  const data: TicketUpdatedType["data"] = {
    desc: "test update",
    id: ticket.id,
    title: "test title update",
    price: "100",
    version: 1,
  };

  //   @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket };
};

it("update a ticket when the event is trigger", async () => {
  const { listener, msg, data, ticket: ticketSetup } = await setUp();
  console.log(
    "🚀 ~ file: ticket-updated-listener.test.ts:36 ~ it ~ data",
    data
  );

  await listener.onMessage(data, msg);

  const ticket = await Ticket.findById(data.id);
  console.log(
    "🚀 ~ file: ticket-updated-listener.test.ts:45 ~ it ~ ticket",
    ticket
  );

  expect(ticket!.id).toBe(data.id);
  expect(ticket!.title).toBe(data.title);
  expect(ticket!.desc).toBe(data.desc);
});

it("acks the msg", async () => {
  const { listener, msg, data } = await setUp();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
