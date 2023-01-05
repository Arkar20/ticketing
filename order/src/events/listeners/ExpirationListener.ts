import {
  ExpirationCompleteType,
  Listener,
  OrderStatus,
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
    console.log(
      "🚀 ~ file: ExpirationListener.ts:17 ~ ExpirationCompleteListener ~ onMessage ~ data",
      data.order_id
    );
    const order = await Order.findById(data.order_id).populate("ticket");

    if (!order) {
      throw Error("Order not Found");
    }

    await order.set({ status: OrderStatus.Cancelled }).save();

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

    msg.ack();
  }
}
export { ExpirationCompleteListener };
