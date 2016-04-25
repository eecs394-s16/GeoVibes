if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2",
    "headers": {
      "steroidsApiKey": "8350b35c695b8a6a8714537b554df65f3d1bbc0fddb76318d19ab1000819e45d",
      "steroidsAppId": 116305
    }
  },
  "resources": {
    "Tweet": {
      "schema": {
        "fields": {
          "content": {
            "type": "string"
          },
          "positivity_rating": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "id": {
            "type": "string",
            "identity": true
          },
          "requestId": {
            "type": "string"
          }
        },
        "identifier": "id"
      }
    }
  }
};