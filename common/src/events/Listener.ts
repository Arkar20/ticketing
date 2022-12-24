import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects-type";
interface Event {
  subject: Subjects;
  data: any;
}
abstract class Listener<T extends Event> {
  abstract type: T["subject"];

  protected stan;
  abstract queueGroupName: string;

  abstract onMessage(data: T["data"], msg: Message): void;

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
      this.type,
      this.queueGroupName,
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
export { Listener };
