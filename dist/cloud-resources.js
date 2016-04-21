if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2",
    "headers": {
      "steroidsApiKey": "9f38eb9dc56f7c1ef619e46a864173d0c6d658f00dee8f701091b42aae917a96",
      "steroidsAppId": 116188
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
          }
        },
        "identifier": "id"
      }
    }
  }
};