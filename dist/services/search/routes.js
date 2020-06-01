"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(`../../config/environments/${ENV}`).default;
const SearchController_1 = require("./SearchController");
const FBMessagingProvider_1 = require("./providers/FBMessagingProvider");
exports.default = [
    {
        path: "/webhook",
        method: "post",
        handler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const entries = req.body.entry;
            console.log(JSON.stringify(req.body));
            for (let entry of entries) {
                let messaging = entry.messaging;
                for (let message of messaging) {
                    let senderId = message.sender.id;
                    console.log(senderId);
                    if (message.message) {
                        // If user send text
                        if (message.message.text) {
                            let text = message.message.text;
                            const meanings = yield SearchController_1.getMeaningByWord(text);
                            yield Promise.all(meanings.map((meaning) => __awaiter(void 0, void 0, void 0, function* () {
                                yield FBMessagingProvider_1.sendMessage(senderId, meaning);
                            })));
                        }
                    }
                }
            }
            res.status(200).send("OK");
        })
    },
    {
        path: "/webhook",
        method: "get",
        handler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            // Your verify token. Should be a random string.
            let VERIFY_TOKEN = envConfig.webhook.verify_token;
            // Parse the query params
            let mode = req.query['hub.mode'];
            let token = req.query['hub.verify_token'];
            let challenge = req.query['hub.challenge'];
            // Checks if a token and mode is in the query string of the request
            if (mode && token) {
                // Checks the mode and token sent is correct
                if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                    // Responds with the challenge token from the request
                    console.log('WEBHOOK_VERIFIED');
                    res.status(200).send(challenge);
                }
                else {
                    // Responds with '403 Forbidden' if verify tokens do not match
                    res.sendStatus(403);
                }
            }
        })
    },
    {
        path: "/test/:word",
        method: "get",
        handler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const word = req.params.word;
            const meanings = yield SearchController_1.getMeaningByWord(word);
            const results = yield Promise.all(meanings.map((meaning) => __awaiter(void 0, void 0, void 0, function* () {
                return yield FBMessagingProvider_1.sendMessage("100003051757638", meaning);
            })));
            res.status(200).json(meanings);
        })
    },
];
//# sourceMappingURL=routes.js.map