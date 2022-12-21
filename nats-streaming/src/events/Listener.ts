import { Message, Stan } from "node-nats-streaming";

abstract class Listener {
  abstract type: string;

  protected stan;
  abstract queueGroupName: string;

  abstract onMessage(data: any, msg: Message): void;

  constructor(stan: Stan) {
    this.stan = stan;
  }

  subscriptionOptions() {
    return this.stan
      .subscriptionOptions()
      .setManualAckMode(true) //to control manually that the event is complete
      .setDeliverAllAvailable() // all events
      .setDurableName(this.queueGroupName); // marking the events proceed or not under the name
  }
  subscribe() {
    const subscribe = this.stan.subscribe(
      "ticket:created",
      "ticket-created-service-group",
      this.subscriptionOptions()
    );
    subscribe.on("message", (msg: Message) => {
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
export default Listener;
