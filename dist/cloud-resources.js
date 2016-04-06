if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2",
    "headers": {
      "steroidsApiKey": "6fe51739e855f550aad73e80d32ed4a8ca13a1c7c51bc2c35162c6fe2dba55e1",
      "steroidsAppId": 113774
    }
  },
  "resources": {
    "Tweet": {
      "schema": {
        "fields": {
          "latitude": {
            "type": "string"
          },
          "longitude": {
            "type": "string"
          },
          "sentiment": {
            "type": "string"
          },
          "time": {
            "type": "string"
          },
          "city": {
            "type": "string"
          },
          "state": {
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