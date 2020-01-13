"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(`../config/environments/${ENV}`).default;
const host = envConfig.redis.host || '127.0.0.1';
const port = envConfig.redis.port || 6379;
const keyPrefix = envConfig.redis.keyPrefix || 'stinger_v1:';
const client = new Redis({ port, host, keyPrefix });
client.on('connect', function () {
    console.log('Redis is connecting...');
});
exports.default = client;
//# sourceMappingURL=redis-client.js.map