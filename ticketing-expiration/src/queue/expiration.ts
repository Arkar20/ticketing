import Queue from "bull";

interface Payload {
  user_id: string;
}
const expirationQueue = new Queue<Payload>("expiration:queue", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log("should be display after 10s", job.data.user_id);
});

export { expirationQueue };
