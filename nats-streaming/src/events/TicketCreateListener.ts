import { Message } from "node-nats-streaming";
import Listener from "./Listener";

class TicketCreateListener extends Listener {
  type = "ticket:create";

  queueGroupName = "tickets-service";

  onMessage(data: any, msg: Message) {
    console.log(data);
    msg.ack();
  }
}

export { TicketCreateListener };
