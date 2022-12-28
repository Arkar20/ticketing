import {
  OrderCancelType,
  Publisher,
  Subjects,
} from "@jeffery_microservice/common";

class OrderCancelledEvent extends Publisher<OrderCancelType> {
  type = Subjects.OrderCancelled;
}

export { OrderCancelledEvent };
