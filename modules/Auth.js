// modules/authenticator.js

// load the config
const config = require("../config.json");

// main class
class Authenticator {
  constructor(caiClient) {
    this.caiClient = caiClient;
  }

  async authenticate(token) {
    try {
      if (config.loginType === "Token") {
        await this.caiClient.authenticateWithToken(token);
      } else if (config.loginType === "Guest") {
        await this.caiClient.authenticateAsGuest();
      }
      
      console.log("Authentication successful");
      return true;
    } catch (error) {
      console.error("Authentication failed:", error);
      return false;
    }
  }
}

// module export it
module.exports = Authenticator;
