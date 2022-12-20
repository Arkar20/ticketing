import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener is listening");

  const options = stan.subscriptionOptions().setManualAckMode(true); //to control manually that the event is complete
  const subscribe = stan.subscribe(
    "ticket:created",
    "ticket-created-service-group",
    options
  );

  subscribe.on("message", (msg: Message) => {
    console.log(msg.getSequence() + "-" + msg.getData());
    msg.ack();
  });
});
