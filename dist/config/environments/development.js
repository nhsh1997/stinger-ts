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
        access_token: 'EAAKGvj8GdMIBAAfbc7ScZAOyKkAFAwYU0rGmXSzWu8ExbtLGcQwFDvZBUxmOxLEnTGc6TcjmTRsmSjSGZBjdA0BZA5lj9yErddbKEc7ZCZBYN4J1glp77GZAVEqvLFGa7jvBNZBL1bMbRKQKUaSpEJmvdD1nCXKW324hhzOoUZAHkTnVOc7moz450'
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