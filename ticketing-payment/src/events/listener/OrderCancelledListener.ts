import {
  Listener,
  OrderCancelType,
  OrderStatus,
  Subjects,
} from "@jeffery_microservice/common";
import { version } from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/";
import { queueGroupName } from "./index";

class OrderCancelledListener extends Listener<OrderCancelType> {
  type = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelType["data"], msg: Message) {
    console.log(
      "🚀 ~ file: OrderCancelledListener.ts:15 ~ OrderCreatedListener ~ onMessage ~ data",
      data
    );
    const order = await Order.findOne({ id: data.id, version: data.version });

    if (!order) {
      throw Error("Order not Exist in DB");
    }

    await order.set({ status: OrderStatus.Cancelled }).save();

    msg.ack();
  }
}

export { OrderCancelledListener };
