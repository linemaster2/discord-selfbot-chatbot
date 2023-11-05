# discord-selfbot-chatbot
Discord selfbot chatbot fully written in nodej, powered by c.ai.


if you want to use Guest login Instead of token login, set the loginType in config.json to the string "Guest" instead of "Token"

![example how to do it](https://cdn.discordapp.com/attachments/838173242124402708/1170625285725638766/image.png)


To run this you will need nodejs of course and the discord.js-selfbot-v13 library, so run 
```
npm i discord.js-selfbot-v13@latest
```
in your terminal.

I did not make the node_characterai module; full credits go to [owner](https://github.com/realcoloride).

You can find the original module on this [link](https://www.npmjs.com/package/node_characterai), even though I didn't really modify anything.

!!! THIS BOT WILL NOT WORK RIGHT OUT OF THE BOX; EDIT STUFF IN CONFIG.JSON SUCH AS CHARACTERID, CHARACTERAITOKEN, DISCORDTOKEN AND THE CHANNELID !!!

To use the token login you have to do a few things
To get your token, you can open your browser, go to the Character.AI website in localStorage.

To do so:

Open the Character.AI website in your browser (https://beta.character.ai)
Open the developer tools (F12, Ctrl+J, or Cmd+J)
Go to the Application tab
Go to the Storage section and click on Local Storage
Look for the @@auth0spajs@@::dyD3gE281MqgISG7FuIXYhL2WEknqZzv::https://auth0.character.ai/::openid profile email offline_access key
Open the body with the arrows and copy the access token

![Picture lol](https://camo.githubusercontent.com/38a2db16b7667356f14659cd7d7b03cfa14977d206c5d6185fed1aedeee5cf5f/68747470733a2f2f692e696d6775722e636f6d2f303951396d4c652e706e67)

Finding your character's ID

You can find your character ID in the URL of a Character's chat page.

For example, if you go to the chat page of the character Test Character you will see the URL https://beta.character.ai/chat?char=8_1NyR8w1dOXmI1uWaieQcd147hecbdIK7CeEAIrdJw.

The last part of the URL is the character ID: ![Picture lol](https://camo.githubusercontent.com/4dd4c40b7ac315e0b2a0342aeea3ad36774fd1edd6c76f1e6f00dd624596abb5/68747470733a2f2f692e696d6775722e636f6d2f6e643836664e342e706e67)

Example how the bot looks like:
![Very epic bot](https://cdn.discordapp.com/attachments/838173242124402708/1170625193274769458/image.png)
