import { startServer } from "./api/useCase";
import server from "./api/useCase/server";
import dbAdapter from "./infra/db";

startServer(dbAdapter, server);
