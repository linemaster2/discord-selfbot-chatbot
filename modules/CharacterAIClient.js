// modules/cai.js

//imports
const CharacterAI = require("./node_characterai");


// main class
class CharacterAIWrapper {
  constructor() {
    this.characterAI = new CharacterAI();
  }

  getCharacterAI() {
    return this.characterAI;
  }
}


// module export it
module.exports = CharacterAIWrapper;