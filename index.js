// index.js

// imports
const DiscordClientWrapper = require("./modules/DiscordClient.js");
const CharacterAIWrapper = require("./modules/CharacterAIClient.js");
const Authenticator = require("./modules/Auth.js");
const MessageHandler = require("./modules/MessageHandler.js");
const config = require("./config.json");

// classes
const caiWrapper = new CharacterAIWrapper();
const discordClientWrapper = new DiscordClientWrapper();

// clients
const discordClient = discordClientWrapper.getDiscordClient();
const caiClient = caiWrapper.getCharacterAI();
const authenticator = new Authenticator(caiClient);
const messageHandler = new MessageHandler(caiClient);

// variables
let enabled = false;

// message handler
discordClient.on("messageCreate", async (message) => {
  try {
    if (enabled) {
      if (message.author.id === discordClient.user.id || message.author.bot) return;
      if (message.channel.id !== config.channel || !message.author) return;
      messageHandler.handleIncomingMessage(message);
    }
  } catch (error) {
    console.error("An error occurred during chat:", error);
  }
});

// auth
discordClient.on("ready", async () => {
  if (await authenticator.authenticate()) {
    enabled = true;
    console.log(`${discordClient.user.username} is online`);
  } else {
    console.log("Failed to authenticate. Check your tokens.");
  }
});

// login
discordClient.login(config.token);