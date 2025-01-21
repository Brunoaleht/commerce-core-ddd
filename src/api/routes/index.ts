import { Router } from "express";

const IndexRoute = Router();

IndexRoute.get("/customer", (req, res) => {
  res.status(200).json({
    message: "Hello, Customer",
  });
});
IndexRoute.get("product", (req, res) => {});
IndexRoute.get("/order", (req, res) => {});

IndexRoute.get("/health-check", (req, res) => {
  res.status(200).json({
    message: "Half-check",
  });
});

export { IndexRoute };
