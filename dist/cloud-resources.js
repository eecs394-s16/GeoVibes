if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2",
    "headers": {
      "steroidsApiKey": "f1b1b704fbd2e55fd43d861ae3189d3a1acc1faa55c9b04c268c5e203d022b7d",
      "steroidsAppId": 116303
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