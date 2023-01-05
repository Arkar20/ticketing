import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publisher";
import { natsWrapper } from "../nats-connect";

interface Payload {
  user_id: string;
}
const expirationQueue = new Queue<Payload>("expiration:queue", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.stan).publish({
    user_id: job.data.user_id,
  });
});

export { expirationQueue };
