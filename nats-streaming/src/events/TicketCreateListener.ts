import { Message } from "node-nats-streaming";

import {
  TicketCreatedType,
  Listener,
  Subjects,
} from "@jeffery_microservice/common";

class TicketCreateListener extends Listener<TicketCreatedType> {
  type = Subjects.TicketCreated;

  queueGroupName = "tickets-service";

  onMessage(data: TicketCreatedType["data"], msg: Message) {
    console.log(data);
    msg.ack();
  }
}

export { TicketCreateListener };
