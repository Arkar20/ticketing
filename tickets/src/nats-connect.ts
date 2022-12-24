import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _stan?: Stan;

  get stan() {
    if (!this._stan) {
      throw new Error("Error connecting to nats");
    }
    return this._stan;
  }

  connect() {
    this._stan = nats.connect("ticketing", "ramdomstring", {
      url: "http://nats-srv:4222",
    });
    return new Promise<void>((resolve, reject) => {
      this.stan.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this.stan.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export default new NatsWrapper();
