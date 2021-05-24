# ![V2 (App INFO) Github](https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png)  StationBot 
A stupid, yet effective moderation bot made with discord.js and node.js
### Donate :D
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M24QEPM)

## Installation
Clone the repo using git or github-cli

Using git

``` git clone https://github.com/stationaryStation/StationBot.git ```

Using github-cli 

``` gh clone stationaryStation/StationBot ```

Then go to the created directory named StationBot.

Install node.js and discord.js

Node.js
```txt
https://nodejs.org/dist/v16.1.0/node-v16.1.0-x86.msi    | Windows
https://nodejs.org/dist/v16.1.0/node-v16.1.0.pkg        | MacOS
https://nodejs.org/dist/v16.1.0/node-v16.1.0-linux-x64.tar.xz | Linux
```

discord.js

```bash
npm install discord.js
```

pm2 (optional if you want to run this bot 24/7)

```bash
npm install pm2 -g
```

You need a Bot token for this bot to work.

To get it, follow this tutorial
www.writebots.com/discord-bot-token/

Then go to config.json and insert the token, also don't forget that the token is yours and nobody should have it.

If config.json is missing for some reason. Copy the following syntax.
```json
{
  "BOT_TOKEN": "insert the bot token here",
  "stable": true
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
```bash
node index.js
```

## Extras (For those who want to run the bot 24\7)

After installing pm2, run the following:

```bash
pm2 startup
pm2 start index.js
pm2 save
```
## Invite the bot
If you don't want to host the bot for yourself and want to use an updated current branch bot. You can invite the official vanilla bot with this link.
https://discord.com/api/oauth2/authorize?client_id=840257245173907457&permissions=4294967287&scope=bot

```txt
The bot is still on early development and might be unstable at times.
```
