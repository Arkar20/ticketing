import {
  BadRequest,
  Listener,
  OrderCreateType,
  Subjects,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model";
import { TicketUpdatedPublisher } from "../publisher/TicketUpdatedPublisher";

class OrderCreatedListener extends Listener<OrderCreateType> {
  queueGroupName = "order-service";
  type = Subjects.OrderCreated;

  async onMessage(data: OrderCreateType["data"], msg: Message) {
    console.log(
      "🚀 ~ file: OrderCreatedListener.ts:16 ~ OrderCreatedListener ~ onMessage ~ data",
      data
    );
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new BadRequest("Ticket Not Found");
    }

    const updatedTicket = await ticket.set({ order_id: data.id }).save();

    const passData = {
      id: updatedTicket.id,
      title: updatedTicket.title,
      price: updatedTicket.price,
      desc: updatedTicket.desc,
      version: updatedTicket.version,
      order_id: updatedTicket.order_id,
    };

    new TicketUpdatedPublisher(this.stan).publish(passData);
    msg.ack();
  }
}

export { OrderCreatedListener };
