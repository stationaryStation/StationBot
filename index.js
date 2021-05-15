const Discord = require("discord.js");
const mySecret = process.env['BOT_TOKEN']
const client = new Discord.Client();
const prefix = "st!";
const verNumber = "1.0.3bc"
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}.\n Ver: ${verNumber}\n Prefix: ${prefix} `);
  console.log('Bot ready for operation.')
  client.user.setActivity(`${prefix}help for command list. | Using Current Branch`, {
    type: 'LISTENING'
 });
});
client.on('message', message => {
  console.log(`${message.author.tag} at ${message.guild.name} said: ${message.content}\n`);
  if (message.content == "fuck") {
    message.reply("Don't say bad words :(");
  }
});
client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "botinfo") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(`StationBot by stationaryStation\n Version: ${verNumber}\n Current Branch: Stable(github)\n Ping: ${timeTaken}ms\n Hosted with: node.js, discord.js and repl.it`)
    }

    if (command === "serverinfo") {
        message.channel.send(`Server name: ${message.guild.name}\n Total Members: ${message.guild.memberCount}\n`)
    }
    if (command === "test") {
        message.reply('Hello World!');
    }
    // Ping Command
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
    // Kick Command
    if (command === "kick") {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.kick('Someone was kicked using st!kick').then(() => {
                    message.reply(`Successfully kicked ${user.tag} `)
                }).catch(err => {
                    message.reply(`Failed to kick ${user.tag}. Do i got the necessary permissions?`);
                    console.error(err);
                });
            } else {
                message.reply("That user isn't in this server!");
            }
        } else {
            message.reply("You didn't mention the user to kick!")
        }
    }
    if (command === "ban") {
        const user = message.mentions.users.first();
        let guildA = client.guilds.cache.get("839953392587112469");
        let requiredRole = guildA.roles.cache.get("839953392587112469");
        let member = guildA.members.cache.get(message.author.id)
        // Check if they have the required role.
        if (member, roles.cache.has(requiredRole.id)) {
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.ban('Someone was banned using st!ban').then(() => {
                        message.reply(`Successfully ban ${user.tag} `)
                    }).catch(err => {
                        message.reply(`Failed to ban ${user.tag}. Do i got the necessary permissions?`);
                        console.error(err);
                    });
                } else {
                    message.reply("That user isn't in this guild!");
                }
            } else {
                message.reply("You didn't mention the user to ban!");
            }
        } else {
            message.channel.send("You don't have the necessary role to run this command.");
        }

    }
    if (command === "help") {
        message.reply(`Current Commands:\n st!kick(username) | This command kicks the selected user.\n st!serverinfo | This command list the current user count of a server and the server name.\n st!ping | Pings the bot and tells your current ping.\n st!test | Sends Hello World! to the chat.\n st!ban(username) | Bans the username.\n st!changeusernick | Sets other's nickname to what you want.\n st!changenick | Changes your nickname (WIP)`);
    }
    if (command === "shutdown") {
        if (message.author.id === '567014451337887744') {
            message.channel.send('Goodbye...').then(sentMessage => {
                sentMessage.react(':white_check_mark:')
                process.exit();
            });
        } else {
            message.reply("HEY! You can't just shutdown myself! You need the author's permission!");
        }

    }
    if (command === "restart") {
        process.exit();
    }
    if (command === "changeusernick") {
        const memberToEdit = message.mentions.members.first();
        const newNickname = message.content.replace(`${prefix}changeusernick`, '').split(' ').pop().trim();
        memberToEdit.setNickname(newNickname);

    }
    if (command === "changenick") {
        const newNick = message.content.replace(`${prefix}changenick`, '').split(' ').pop().trim();
        message.member.setNickname(newNick);
    }
    if (command === "devcommands") {
        message.channel.send(`Current Dev Commands:\n shutdown: Shutdowns the bot. If node.js mode is enabled, the bot will shutdown.\n st!restart: Restarts the bot, if you are the owner.`);
    }
    if (command === "devmedia") {
        message.channel.send(`Dev's twitter:\n https://twitter.com/dumplingfurry/\n Dev's StackOverflow:\n https://stackoverflow.com/users/15887961/stationarystation?tab=profile `);
    }
    if (command === "pootisfy") {
      const nick = "pootis"
      message.member.setNickname(nick);
    }

});

client.login(mySecret);