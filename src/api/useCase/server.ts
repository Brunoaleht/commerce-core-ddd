import { HttpServer } from "../services/HttpServer";

const server = new HttpServer({ port: 3000, env: "development" });

export default server;
