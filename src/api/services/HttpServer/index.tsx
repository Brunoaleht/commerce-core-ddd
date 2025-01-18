import express, { type Express, Request, Response } from "express";
import http from "http";
import { IndexRoute } from "../../routes";

type NodeEnv = "development" | "production" | "testing";

export interface IAppOptions {
  port: number;
  env: NodeEnv;
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
    return this;
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

  start() {
    this.routes();
    this.started = true;
    return this;
  }
}
