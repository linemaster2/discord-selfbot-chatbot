// modules/messageHandler.js

// imports
const config = require("../config.json");
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path")

class MessageHandler {
  constructor(caiClient) {
    this.caiClient = caiClient;
    this.messageQueue = [];
    this.isProcessingQueue = false;
  }

  handleIncomingMessage(message) {
    this.messageQueue.push(message);
    this.processMessageQueue();
  }

  async processMessageQueue() {
    if (this.messageQueue.length === 0 || this.isProcessingQueue) return;
    this.isProcessingQueue = true;
    try {
      const message = this.messageQueue.shift();
      await this.processMessage(message, config.characterId);
    } catch (error) {
      console.error("An error occurred during chat:", error);
    }
    this.isProcessingQueue = false;
    setImmediate(() => this.processMessageQueue());
  }

  async processMessage(message, characterid) {
    try {
      await message.channel.sendTyping();
      if (config.seeImages && message.attachments.size > 0) {
        const attachment = message.attachments.first();
    
        if (attachment && attachment.url) {
            try {
                const chat = await this.caiClient.createOrContinueChat(characterid);
                const response = await axios.get(attachment.url, { responseType: 'arraybuffer' });
                const imageData = Buffer.from(response.data, 'binary');
                const imageName = `image_${Date.now()}.${attachment.name || 'jpg'}`;
                const imagePath = path.join(__dirname, 'images', imageName);
                fs.writeFile(imagePath, imageData, (err) => {
                    if (err) {
                        console.error('Error saving image:', err.message);
                        return;
                    }
                    chat.sendAndAwaitResponse({ text: message.content, image_rel_path: imagePath }, true).catch((err) => {
                      if (err) {
                        console.error('Error uploading image:', err.message);
                      } else {
                        fs.unlink(imagePath).catch((unlinkErr) => {
                            console.error('Error deleting image:', unlinkErr.message);
                        });
                      }
                    });                 
                });
            } catch (error) {
                console.error('Error sending and awaiting response:', error.message);
            }
        } else {
            console.error('Error: Message attachments or URL is undefined.');
        }
        return;
      }
      const chat = await this.caiClient.createOrContinueChat(characterid);
      const response = await chat.sendAndAwaitResponse(message.content, true);
      if (response && response.text) {
          const unicode = "⁤";
          const separatedText = response.text.split("").join(unicode);
          message.reply(separatedText);
      } else {
          console.log("Received an empty or invalid response from C.AI.");
      }
    } catch (error) {
        console.error('Error communicating with C.AI:', error)
    }
  }
}

module.exports = MessageHandler;