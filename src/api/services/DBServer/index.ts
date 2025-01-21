import { IDatabaseConnection } from "../../../infra/db/db.interface";
import { LoggerServer } from "../LoggerServer";
import { ILogger } from "../LoggerServer/logger.interface";

export class DBServer {
  private static instance: DBServer | null = null;
  private isConnected: boolean = false;
  private readonly logger: ILogger;

  private constructor(
    private readonly dbAdapter: IDatabaseConnection,
    logger?: ILogger
  ) {
    this.logger = logger || new LoggerServer();
  }

  public static getInstance(
    dbAdapter: IDatabaseConnection,
    logger?: ILogger
  ): DBServer {
    if (!this.instance) {
      this.instance = new DBServer(dbAdapter, logger);
    }
    return this.instance;
  }

  async initialize(): Promise<void> {
    try {
      if (this.isConnected) {
        this.logger.warn("Database is already connected");
        return;
      }

      await this.dbAdapter.connect();
      this.isConnected = true;
      this.logger.info("Database initialized successfully");
    } catch (error) {
      this.logger.error("Database initialization failed", error);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      if (!this.isConnected) {
        this.logger.warn("Database is not connected");
        return;
      }

      await this.dbAdapter.disconnect();
      this.isConnected = false;
      this.logger.info("Database connection closed successfully");
    } catch (error) {
      this.logger.error("Error closing database connection", error);
      throw error;
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}
