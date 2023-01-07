import {
  Listener,
  OrderCreateType,
  Subjects,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/";
import { queueGroupName } from "./index";

class OrderCreatedListener extends Listener<OrderCreateType> {
  type = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreateType["data"], msg: Message) {
    console.log(
      "🚀 ~ file: OrderCreatedListener.ts:15 ~ OrderCreatedListener ~ onMessage ~ data",
      data
    );
    const order = await Order.build({
      id: data.id,
      price: data.ticket.price,
      version: data.version,
      user_id: data.user_id,
      status: data.status,
    }).save();

    msg.ack();
  }
}

export { OrderCreatedListener };
