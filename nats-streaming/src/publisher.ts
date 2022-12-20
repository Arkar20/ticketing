import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "123", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher is connected to NATS");
  const data = JSON.stringify({
    name: "jeffery",
    age: 22,
  });

  stan.publish("ticket:created", data, () => {
    console.log("event published");
  });
});
