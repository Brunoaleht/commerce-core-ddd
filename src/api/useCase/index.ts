import { DatabaseAdapter } from "../../infra/db/DatabaseAdapter";
import { HttpServer } from "../services/HttpServer";
import { ILogger } from "../services/LoggerServer/logger.interface";
import { LoggerServer } from "../services/LoggerServer";
import { DBServer } from "../services/DBServer";
import config from "../../infra/db/config";

export type ReturnStartApi = {
  closeServer: () => Promise<void>;
  port: number;
  dbName: string;
};

export async function startServer(
  dbAdapter: DatabaseAdapter,
  server: HttpServer
): Promise<ReturnStartApi | null> {
  const log = new LoggerServer();

  try {
    log.info("Starting server initialization...");

    // Initialize database
    const db = DBServer.getInstance(dbAdapter, log);
    await db.initialize();
    log.info("Database connection established");

    // Start HTTP server
    const startedServer = await server.start();
    log.info(`Server started on port ${server.getPort()}`);

    return {
      closeServer: async () => {
        log.info("Shutting down server...");
        await db.close();
        log.info("Server shutdown complete");
      },
      port: startedServer.port,
      dbName: config.database,
    };
  } catch (error) {
    log.error("Failed to start server:", error);
    return null;
  }
}
