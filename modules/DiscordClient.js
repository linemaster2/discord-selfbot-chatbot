// modules/discordClient.js

// imports
const Discord = require("discord.js-selfbot-v13");


// main class
class DiscordClientWrapper {
  constructor() {
    this.discordClient = new Discord.Client({
      checkUpdate: false,
    });
  }

  getDiscordClient() {
    return this.discordClient;
  }
}

// module export it
module.exports = DiscordClientWrapper;