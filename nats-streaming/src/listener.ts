import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener is listening");

  const subscribe = stan.subscribe(
    "ticket:created",
    "ticket-created-service-group"
  );

  subscribe.on("message", (msg: Message) => {
    console.log(msg.getData());
  });
});
