# StationBot
A stupid, yet effective moderation bot made with discord.js and node.js

## Current commands
**st!test**     |  Tests the bot with a simple Hello World! message

**st!serverinfo** |  Displays current server information.

**st!ping**     | Pings the bot and displays your current ping.

**st!kick**     | Kicks the selected username.

**st!ban**   | Bans the selected username.

**st!forcerestart** | Restarts the bot. 

**st!botinfo** | Displays current bot info

**st!devcommands** | Displays current developer commands.

## Installation
Clone the repo using git or github-cli

Using git

``` git clone https://github.com/stationaryStation/StationBot.git ```

Using github-cli 

``` gh clone stationaryStation/StationBot ```

Then go to the created directory named StationBot.

Install node.js and discord.js

Node.js
```
https://nodejs.org/dist/v16.1.0/node-v16.1.0-x86.msi    | Windows
https://nodejs.org/dist/v16.1.0/node-v16.1.0.pkg        | MacOS
https://nodejs.org/dist/v16.1.0/node-v16.1.0-linux-x64.tar.xz | Linux
```

discord.js

```
npm install discord.js
```

pm2 (optional if you want to run this bot 24/7)

```
npm install pm2 -g
```

You need a Bot token for this bot to work.

To get it, follow this tutorial
www.writebots.com/discord-bot-token/

Then go to config.json and insert the token, also don't forget that the token is yours and nobody should have it.
```
{
  "BOT_TOKEN": "insert the bot token here"
}
```
You also can use repl.it's .env files to insert the token (Recomended by me)

Follow the instructions here. Go to the secrets tab on repl.it and insert the folowing:
``` env
Key: BOT_TOKEN
VALUE: "insert the bot token here"
``` 
After inserting, go to index.js and insert the folowing line to the start of the document
``` javascript
const mySecret = process.env['BOT_TOKEN']
```

Then run the following command
```
node index.js
```

## Extras (For those who want to run the bot 24\7)

After installing pm2, run the following:

```
pm2 startup
pm2 start index.js
pm2 save
```
## Invite the bot
If you don't want to host the bot for yourself and want to use an updated current branch bot. You can invite the official vanilla bot with this link.
https://discord.com/api/oauth2/authorize?client_id=840257245173907457&permissions=4294967287&scope=bot

```
The bot is still on early development and might be unstable at times.
```