import {
  OrderCreateType,
  Publisher,
  Subjects,
} from "@jeffery_microservice/common";

class OrderCreatedEvent extends Publisher<OrderCreateType> {
  type = Subjects.OrderCreated;
}

export { OrderCreatedEvent };
