import nats from "node-nats-streaming";
import { TicketCreatePublisher } from "./events/TicketCreatedPublisher";
console.clear();

const stan = nats.connect("ticketing", "123", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher is connected to NATS");

  new TicketCreatePublisher(stan).publish({
    id: 1,
    title: "Hello",
    desc: "hello desc",
  });
});
