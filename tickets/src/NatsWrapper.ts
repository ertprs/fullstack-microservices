import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client(): Stan {
    if (!this._client) {
      throw new Error("Cannot access client before connect");
    }
    return this._client;
  }
  connect(ClusterID: string, clientID: string, url: string): Promise<unknown> {
    this._client = nats.connect(ClusterID, clientID, { url });
    return new Promise((resolve, reject): void => {
      this.client.on("connect", (): void => {
        console.log("Connected to NATS");
        resolve();
      });
      this.client.on("error", (err: Error): void => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
