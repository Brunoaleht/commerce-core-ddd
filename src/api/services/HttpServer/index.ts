import express, { type Express, Request, Response } from "express";
import http from "http";
import { IndexRoute } from "../../routes";

type NodeEnv = "development" | "production" | "testing";

export interface IAppOptions {
  port: number;
  env: NodeEnv;
}

export interface IServerInfo {
  port: number;
  started: boolean;
}

export class HttpServer {
  private readonly port: number;
  private readonly express: Express;
  private readonly env: NodeEnv;
  private readonly server: http.Server;
  private started: boolean;

  constructor({ port, env }: IAppOptions) {
    this.port = port;
    this.env = env;
    this.express = express();
    this.server = http.createServer(this.express);
    this.started = false;
  }

  private routes() {
    this.express.use("/api/v1", IndexRoute);
    this.express.get("/", (req: Request, res: Response): void => {
      res.status(200).send({
        message: "Welcome to the API",
        upTime: process.uptime(),
      });
    });
    this.express.get("/*", (req: Request, res: Response): void => {
      res
        .status(404)
        .send({
          message: "Resource not found",
        })
        .end();
    });
  }

  public getPort(): number {
    return this.port;
  }

  public async start(): Promise<IServerInfo> {
    if (this.started) {
      throw new Error("Server is already running");
    }

    this.routes();

    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        this.started = true;
        resolve({
          port: this.port,
          started: this.started,
        });
      });
    });
  }

  public async stop(): Promise<void> {
    if (!this.started) {
      throw new Error("Server is not running");
    }

    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        this.started = false;
        resolve();
      });
    });
  }
}
