import {
  Listener,
  Subjects,
  TicketCreatedType,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model";

class TicketCreatedListener extends Listener<TicketCreatedType> {
  type = Subjects.TicketCreated;
  queueGroupName = "order-service";

  async onMessage(data: TicketCreatedType["data"], meg: Message) {
    const ticket = Ticket.build({
      id: data.id,
      title: data.title,
      desc: data.desc,
      price: Number(data.price),
    });

    await ticket.save();
    console.log(
      "🚀 ~ file: TicketCreatedListener.ts:20 ~ TicketCreatedListener ~ onMessage ~ ticket",
      ticket
    );
  }
}
export { TicketCreatedListener };
