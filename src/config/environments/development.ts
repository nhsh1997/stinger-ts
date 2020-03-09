export default {
  web: {
    port: 3000
  },
  webhook: {
    verify_token: 'hello'
  },
  facebook: {
    access_token: 'EAAKGvj8GdMIBAAZAKpZCo5V7G9MPZBJeGgamkgW94efUZCXK3V0LDTiBZCrOZBSVLdz3uoC4v7QBpoVIEoS9RQCbEI4EV1aAbdKzfIVZBBxrhz3NkxbdF8oTTRWOAugZBuZCrSuro0nnP8xXPpZCxKyMx5kD1bQgj9XE3AAmXjxF3fsohfJIVDBSZBj'
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
