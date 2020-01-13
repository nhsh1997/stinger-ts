import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorMiddleware from './middleware/errorHandlers';
import routes from './services';
const router = express();
const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(`./config/environments/${ENV}`).default;
const PORT = envConfig.web.port;
const server = http.createServer(router);
import './db/redis-client';
process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorMiddleware, router);


server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);
