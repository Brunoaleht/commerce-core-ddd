import { IDatabaseConnection } from "./db.interface";

export class DatabaseAdapter {
  constructor(private connection: IDatabaseConnection) {}

  public async connect(): Promise<void> {
    await this.connection.connect();
  }

  public async disconnect(): Promise<void> {
    await this.connection.disconnect();
  }

  public getInstance(): IDatabaseConnection {
    return this.connection;
  }
}
