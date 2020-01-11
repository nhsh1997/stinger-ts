"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(`../../../config/environments/${ENV}`).default;
const accessToken = envConfig.facebook.access_token;
exports.sendMessage = (senderId, message) => {
    try {
        request_1.default({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: accessToken,
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: {
                    text: message
                },
            }
        });
    }
    catch (e) {
        console.log(e);
    }
};
//# sourceMappingURL=FBMessagingProvider.js.map