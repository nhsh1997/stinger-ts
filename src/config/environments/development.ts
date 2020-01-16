export default {
  web: {
    port: 3000
  },
  webhook: {
    verify_token: 'hello'
  },
  facebook: {
    access_token: 'EAAKGvj8GdMIBAOZBfRBxDXVQ3tnwOZCZCoVHXNbG9jjes6XtSrJEERo1QFGb61JnyHWcwfTmEeZCYRKWh3lnCnmyCS0vqZCcMX36bqZCr0Pm4oR99NxK2ZAqhKIpGK2ZCnD2p1c7m80ZAJWRYmugWkGzoWWDiLB3ZArgqYP4WyUNstX12VwDaRT77T'
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
}
