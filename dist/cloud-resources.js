if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2",
    "headers": {
      "steroidsApiKey": "2028b49b7731f7d78ca535473df9db4a85d6202b13dfa967e7a663836e008608",
      "steroidsAppId": 116306
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