const Discord = require('discord.js');
const config = require('./config.json')
const client = new Discord.Client();
const prefix = 'st!';
const verNumber = '1.0.4c';
const dev = '567014451337887744';
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}.\n Ver: ${verNumber}\n Prefix: ${prefix} `);
  console.log('Bot ready for operation.');
  client.user.setActivity(`${prefix}help for command list. | Using Current Branch`, {
    type: 'LISTENING'
 });
});
client.on('message', message => {
  console.log(`${message.author.tag} at ${message.guild.name} said: ${message.content}\n`);
  if (message.content == "fuck") {
    message.reply('Don\'t say bad words :(');
  }
});
client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    // lists bot info
    if (command === "botinfo") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(`StationBot by stationaryStation\n Version: ${verNumber}\n Current Branch: Stable(github)\n Ping: ${timeTaken}ms\n Hosted with: node.js, discord.js and repl.it`)
    }
    // Lists server info
    if (command === "serverinfo") {
        message.channel.send(`Server name: ${message.guild.name}\n Total Members: ${message.guild.memberCount}\n`)
    }
    // test if the bot works
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
        const cmd = message.content.replace(`${prefix}help`,'').split(' ').pop().trim();
        if (cmd === "kick" ) {
            message.channel.send(`${prefix}kick <username>\nUsage: Kicks the user that you mentioned. `);
        } else if (cmd ==="ping" ) {
            message.channel.send(`${prefix}ping\nUsage: The bot replies to you with your current ping.`);
        } else if (cmd === "shutdown") {
            message.channel.send(`${prefix}shutdown\nUsage: Shutdowns the bot.\n Requirements: Be the dev`);
        } else if (cmd === "restart") {
            message.channel.send(`${prefix}restart\nUsage: Restarts the bot`);
        } else if (cmd === "help") {
            message.channel.send(`${prefix}help <command>\nUsage: Lists all current commands`);
        } else if (cmd === "ban") {
            message.channel.send(`${prefix}ban <UserID/User>\nUsage: Bans the user mentioned permanently\nRequirements: Be an admin`);
        } else if (cmd === "pootisfy") {
            message.channel.send(`${prefix}pootisfy\n Usage: Changes your nickname to pootis\nRequirements: You need to not have the manage nicknames permission and the change nickname permission`);
        } else if (cmd === "changeusernick") {
            message.channel.send(`${prefix}changeusernick <user> <nick>\nUsage: Changes the nickname of the user mentioned to whatever you like`);
        } else if (cmd === "changenick") {
            message.channel.send(`${prefix}changenick <nick>\nUsage: Changes your nickname to whatever you like\nRequirements: You need to not have nor the manage nicknames permission and the change nickname permission `);
        } else if (cmd === "boop"){
            message.channel.send(`${prefix}boop <user>\n Usage: Boops the mentioned user`);
        } else if (cmd === "devmedia") {
            message.channel.send(`${prefix}devmedia\nUsage: Lists stationaryStation's social media`);
        } else if (cmd === "") {
            message.reply(`Commands:\ndevmedia\nboop\nchangenick\nchangeusernick\npootisfy\nban\nhelp\nrestart\nshutdown\nping\nkick`);
        }
       
    }
    if (command === "shutdown") {
        if (message.author.id === dev) {
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
    if (command === "resetnick") {
        const nick = message.author.tag();
        message.member.setNickname(nick);
        
    }
    if (command === "boop") {
        const userToPing = message.mentions.members.first()
        if (userToPing){
            message.channel.send(`${userToPing}, Boop! ;p`);
        } else {
            message.reply(`I can't boop the void! >:(\n So please mention a user goddamit. `);
        }
    }

});

client.login(config.BOT_TOKEN);