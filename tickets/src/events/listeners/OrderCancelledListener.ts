import {
  BadRequest,
  Listener,
  OrderCancelType,
  Subjects,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model";
import { TicketUpdatedPublisher } from "../publisher/TicketUpdatedPublisher";

class OrderCancelledListener extends Listener<OrderCancelType> {
  type = Subjects.OrderCancelled;
  queueGroupName = "order-service";

  async onMessage(data: OrderCancelType["data"], msg: Message) {
    console.log(
      "🚀 ~ file: OrderCancelledListener.ts:16 ~ OrderCancelledListener ~ onMessage ~ data",
      data
    );
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new BadRequest("Ticket Not Found");
    }

    const updatedTicket = await ticket.set({ order_id: undefined }).save();

    new TicketUpdatedPublisher(this.stan).publish({
      id: updatedTicket.id,
      title: updatedTicket.title,
      price: updatedTicket.price,
      desc: updatedTicket.desc,
      version: updatedTicket.version,
    });

    msg.ack();
  }
}

export { OrderCancelledListener };
