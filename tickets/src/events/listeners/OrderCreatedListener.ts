import {
  BadRequest,
  Listener,
  OrderCreateType,
  Subjects,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model";

class OrderCreatedListener extends Listener<OrderCreateType> {
  queueGroupName = "order:service";
  type = Subjects.OrderCreated;

  async onMessage(data: OrderCreateType["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new BadRequest("Ticket Not Found");
    }

    await ticket.set({ order_id: data.status }).save();

    msg.ack();
  }
}

export { OrderCreatedListener };
