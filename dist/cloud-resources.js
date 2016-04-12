if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2",
    "headers": {
      "steroidsApiKey": "3cab84b02b6e1ea1baef775bca68e4cec0f0c59b17ea318105be2b687257ef76",
      "steroidsAppId": 114667
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
          "id": {
            "type": "string",
            "identity": true
          },
          "latitude": {
            "type": "string"
          },
          "longitude": {
            "type": "string"
          }
        },
        "identifier": "id"
      }
    }
  }
};