import { Message } from "node-nats-streaming";
import Listener from "./Listener";
import { Subjects } from "./subjects-type";
import { TicketCreatedType } from "./TicketCreatedType";

class TicketCreateListener extends Listener<TicketCreatedType> {
  type = Subjects.TicketCreated;

  queueGroupName = "tickets-service";

  onMessage(data: TicketCreatedType["data"], msg: Message) {
    console.log(data);
    msg.ack();
  }
}

export { TicketCreateListener };
