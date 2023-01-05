import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publisher";
import { natsWrapper } from "../nats-connect";

interface Payload {
  order_id: string;
}
const expirationQueue = new Queue<Payload>("expiration:queue", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.stan).publish({
    order_id: job.data.order_id,
  });
});

export { expirationQueue };
