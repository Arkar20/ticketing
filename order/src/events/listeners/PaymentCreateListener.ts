import {
  PaymentCreateType,
  Listener,
  Subjects,
  OrderStatus,
} from "@jeffery_microservice/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../model";
export class PaymentCreateListener extends Listener<PaymentCreateType> {
  type: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = "order-service";

  async onMessage(data: PaymentCreateType["data"], msg: Message) {
    console.log(
      "🚀 ~ file: PaymentCreateListener.ts:12 ~ PaymentCreateListener ~ onMessage ~ data",
      data
    );

    const order = await Order.findById(data.order_id);

    if (!order) {
      throw new Error("Order Not Found");
    }

    await order.set({ status: OrderStatus.Complete }).save();

    msg.ack();
  }
}
