if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2",
    "headers": {
      "steroidsApiKey": "413ed5a5110305286b7e7db15b43cc7706574992504ae52fcf1c8da7854cdf4b",
      "steroidsAppId": 114672
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
          "longtitude": {
            "type": "string"
          },
          "lattitude": {
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