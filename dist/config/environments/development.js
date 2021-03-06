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
        access_token: 'EAAKGvj8GdMIBACtvg5yrBbv9Pmh2hAbp6jbH4DGo3YoWFeZCjx0dy48mTcnzIpmOffL8a4JijeL0x3bUpxOZCNBmxpUWS1IsRMZA5gmlx1eNyEIMQ6tWlZBTNXM04iKjKD7VAKISWVPM2ZC9XgIg18rKPs0FX6Ho2SnQt2kdApvxA4sBJES0J'
    },
    oxford: {
        app_id: 'fcee0c15',
        app_key: 'dc320802eff7c3e8ef9cfd26ece6583a'
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