import {
  ExpirationCompleteType,
  Listener,
  Subjects,
} from "@jeffery_microservice/common";
import { version } from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../model";
import { natsWrapper } from "../../nats-connect";
import { OrderCancelledEvent } from "../publisher/OrderCancelEvent";

class ExpirationCompleteListener extends Listener<ExpirationCompleteType> {
  type = Subjects.ExpirationComplete;
  queueGroupName = "order-service";

  async onMessage(data: ExpirationCompleteType["data"], msg: Message) {
    const order = await Order.findById(data.order_id).populate("ticket");

    if (!order) {
      throw Error("Order not Found");
    }

    await order.set({ status: Subjects.OrderCancelled }).save();

    new OrderCancelledEvent(natsWrapper.stan).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
        title: order.ticket.title,
        desc: order.ticket.desc,
        price: order.ticket.price,
      },
    });
  }
}
export { ExpirationCompleteListener };
