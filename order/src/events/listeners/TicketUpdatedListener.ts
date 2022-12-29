import {
  BadRequest,
  Listener,
  Subjects,
  TicketUpdatedType,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model";

class TicketUpdatedListener extends Listener<TicketUpdatedType> {
  type = Subjects.TicketUpdated;
  queueGroupName = "order-service";

  async onMessage(data: TicketUpdatedType["data"], msg: Message) {
    const ticket = await Ticket.findById(data.id);
    const { title, desc, price } = data;

    if (!ticket) {
      throw new BadRequest("Ticket Not Found");
    }

    await ticket.set({ title, desc, price }).save();

    console.log(
      "🚀 ~ file: TicketUpdatedListener.ts:20 ~ TicketUpdatedListener ~ onMessage ~ ticket",
      ticket
    );

    msg.ack();
  }
}
export { TicketUpdatedListener };