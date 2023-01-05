import {
  Listener,
  OrderCreateType,
  Subjects,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queue";
class OrderCreatedListener extends Listener<OrderCreateType> {
  queueGroupName = "expire-service";
  type = Subjects.OrderCreated;

  async onMessage(data: OrderCreateType["data"], msg: Message) {
    console.log(
      "🚀 ~ file: OrderCreatedListener.ts:12 ~ OrderCreatedListener ~ onMessage ~ data",
      data
    );
    const delay = new Date(data.expire_at).getTime() - new Date().getTime();
    console.log(
      "🚀 ~ file: OrderCreatedListener.ts:18 ~ OrderCreatedListener ~ onMessage ~ delay",
      delay
    );

    await expirationQueue.add(
      {
        user_id: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}

export { OrderCreatedListener };
