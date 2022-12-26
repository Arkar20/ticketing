import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects-type";

interface Event {
  subject: Subjects;
  data: any;
}
abstract class Publisher<T extends Event> {
  abstract type: T["subject"];

  private stan;

  constructor(stan: Stan) {
    this.stan = stan;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise<T["data"]>((resolve, reject) => {
      this.stan.publish(this.type, JSON.stringify(data), (err) => {
        if (err) reject(err);
        console.log("event has publish");
        resolve(data);
      });
    });
  }
}

export { Publisher };
