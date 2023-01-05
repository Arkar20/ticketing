import {
  Listener,
  OrderCreateType,
  Subjects,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
class OrderCreatedListener extends Listener<OrderCreateType> {
  queueGroupName = "order:service";
  type = Subjects.OrderCreated;

  onMessage(data: OrderCreateType["data"], msg: Message) {
    console.log(
      "🚀 ~ file: OrderCreatedListener.ts:12 ~ OrderCreatedListener ~ onMessage ~ data",
      data
    );
    msg.ack();
  }
}

export { OrderCreatedListener };
