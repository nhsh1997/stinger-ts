export default {
  web: {
    port: 3000
  },
  webhook: {
    verify_token: 'hello'
  },
  facebook: {
    access_token: 'EAAKGvj8GdMIBAFWMDRChUdH2lFrZBuZBQcCf7Thnrqtccbeq75t7QFAGFE6hobtDdPMp60vRHngdAHhQ3nI6nSaCrVKc4BEpmI7iDRemzuGjUbbAXX6wK31XZBVhuK4a1gQheTiJHct29IaJvsSu3FaiSO4EiOHkbOu36cFuAZDZD'
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
