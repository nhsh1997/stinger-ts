"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.handleCors = (router) => {
    router.use(cors_1.default({ credentials: true, origin: true }));
};
exports.handleBodyRequestParsing = (router) => {
    router.use(body_parser_1.default.urlencoded({ extended: true }));
    router.use(body_parser_1.default.json());
};
exports.handleCompression = (router) => {
    router.use(compression_1.default());
};
exports.requestLog = (router) => {
    //Log when recieved requests and catch 404 and forward to error handler.
    router.use((req, res, next) => {
        console.log(`${req.method} requests for ${req.url} - ${JSON.stringify(req.body)}`);
        next();
    });
};
//# sourceMappingURL=common.js.map