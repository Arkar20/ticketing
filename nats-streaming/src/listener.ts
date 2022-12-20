import nats, { Message } from "node-nats-streaming";

console.clear();
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener is listening");

  const subscribe = stan.subscribe("ticket:created");

  subscribe.on("message", (msg: Message) => {
    console.log(msg.getData());
  });
});
