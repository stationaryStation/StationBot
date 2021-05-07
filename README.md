# StationBot
A stupid, yet effective moderation bot made with discord.js and node.js

## Current commands
**st!test**     |  Tests the bot with a simple Hello World! message

**st!serverinfo** |  Displays current server information.

**st!ping**     | Pings the bot and displays your current ping.

**st!kick**     | Kicks the selected username.

**st!ban**   | Bans the selected username.

**st!forcerestart** | Restarts the bot. 

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
npm install discord.js -g
```

pm2 (optional if you want to run this bot 24/7)

```
nmp install pm2
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

Then run the following command
```
node index.js
```

## Extras (For those who want to run the bot 24\7)

After installing pm2, run the following:

```
pm2 startup
pm2 save
pm2 start index.js
```
