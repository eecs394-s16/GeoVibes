if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2",
    "headers": {
      "steroidsApiKey": "a8632d74cec2df8c96e94a6caea3b7132bb01d62f40448dadec0d81e2c920645",
      "steroidsAppId": 115029
    }
  },
  "resources": {
    "Tweet": {
      "schema": {
        "fields": {
          "city": {
            "type": "string"
          },
          "content": {
            "type": "string"
          },
          "sentiment": {
            "type": "string"
          },
          "state": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "latitude": {
            "type": "string"
          },
          "longitude": {
            "type": "string"
          },
          "id": {
            "type": "string",
            "identity": true
          }
        },
        "identifier": "id"
      }
    }
  }
};