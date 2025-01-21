import { ILogger } from "./logger.interface";

export class LoggerServer implements ILogger {
  public info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  public error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${message}`, error);
  }

  public warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }
}
