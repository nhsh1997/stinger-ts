"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    web: {
        port: 3000
    },
    webhook: {
        verify_token: 'hello'
    },
    facebook: {
        access_token: 'EAAKGvj8GdMIBACaayOEjwnlW6IejZA0DzltWS3G4pgQzKfJlT3SmtogA8xBZAoufhvvMseX27wOZBF7CT1LXpO9guHuRHyohMj1Xd5dwj6gDUeodHEZAhqCUKc8WYBS8sI8rZBBzGTVUmFgfj2YE5bPZBEmyY63oBrsLyowOBsAqDZBFiIoG9lq'
    },
    redis: {
        read: {
            domain: "127.0.0.1",
            port: "6379",
            options: {
                keyPrefix: "stinger_v1:",
                autoResendUnfulfilledCommands: false,
                enableOfflineQueue: false,
                maxRetriesPerRequest: null
            }
        },
        write: {
            domain: "127.0.0.1",
            port: "6379",
            options: {
                keyPrefix: "stinger_v1:",
                autoResendUnfulfilledCommands: false,
                enableOfflineQueue: false,
                maxRetriesPerRequest: null
            },
            exprire: {
                segment: 5
            }
        }
    }
};
//# sourceMappingURL=development.js.map