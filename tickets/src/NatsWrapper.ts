import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;
  connect(ClusterID: string, clientID: string, url: string): Promise<unknown> {
    this._client = nats.connect(ClusterID, clientID, { url });
    return new Promise((resolve, reject): void => {
      this._client?.on("connect", (): void => {
        console.log("Connected to NATS");
        resolve();
      });
      this._client?.on("error", (err: Error): void => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
