const Discord = require('discord.js');
const config = require('./config.json');
// Required variables
const client = new Discord.Client();
const prefix = config.prefix
const fetch = require('node-fetch')
const querystring = require('querystring')
// When the bot is ready, the presence is set to the help command.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}.\n Ver: ${config.botVer}\n Prefix: ${prefix}`);
  console.log('Bot ready for operation.');
  if (config.stable == true){
    client.user.setActivity(`${prefix}help for command list. | Using Current Branch`, {
        type: 'LISTENING'
     });
  } else if (config.stable == false) {
    client.user.setActivity(`${prefix}help for command list. | Using Unstable Branch`, {
        type: 'LISTENING'
     });
  }else if (config.branchNext == true){
    client.user.setActivity(`${prefix}help for command list. | Using Next Branch`, {
        type: 'LISTENING'
     });
  } else {
      // This is just in case of the bot breaking.
      console.error("An unexpected error has ocurred. Please report the issue to https://github.com/stationaryStation/stationBot/issues");
  }
  
});
// When a message is sended in a guild(Server), it will be logged on the console/output
client.on("message", async message => {
    console.log(`${message.author.tag} at ${message.guild.name} said: ${message.content}\n`);

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    // lists bot info
    if (command === ""){
        const InvalidEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Invalid Command`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Sorry, You need to enter a valid Command :(`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20InvalidCommand.png`)
            message.channel.send(InvalidEmbed)
    }
    if (command === "botinfo") {
        // Create a Embed message with bot information
        const botInfoEmbed = new Discord.MessageEmbed()
	.setColor('#FF0057')
	.setTitle(`StationBot ${config.botVer}`)
	.setURL('https://github.com/stationaryStation/stationBot')
	.setAuthor('stationaryStation', 'https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png', 'https://github.com/stationaryStation')
	.setDescription(`StationBot by stationaryStation\nA bot for moderation made with the powerful discord.js engine.`)
	.setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png')
        // Then send the embed to the user's channel
        message.channel.send(botInfoEmbed)
    }
    // Lists server info
    if (command === "serverinfo") {
        const serverInfoEmbed = new Discord.MessageEmbed()
    .setColor('#FF0057')
    .setTitle(`Server Information`)
    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
    .setDescription(`Server Name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`)
    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20SeverInfo.png`)
        message.channel.send(serverInfoEmbed)
    }
    // test if the bot works
    if (command === "test") {
        const TestEmbed = new Discord.MessageEmbed()
    .setColor('#FF0057')
    .setTitle(`Test Embed`)
    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
    .setDescription(`Testing Embeds and messages`)
    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Test.png`)
    message.channel.send(TestEmbed)
    }
    // Ping Command
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        const PingEmbed = new Discord.MessageEmbed()
    .setColor('#FF0057')
    .setTitle(`Pong!`)
    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
    .setDescription(`Your current ping is: ${timeTaken}`)
    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Ping.png`)
        message.channel.send(PingEmbed);
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
    // ban command
    if (command === "ban") {
        const user = message.mentions.users.first();
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
        } 

    // Help Command
    if (command === "help") {
        const cmd = message.content.replace(`${prefix}help`,'').split(' ').pop().trim();
        if (cmd === "kick" ) {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Kick`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage:\nKicks the mentioned user from the server/guild\nSyntax:\n${prefix}kick <user>\nPermissions: Be an Admin.`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
        } else if (cmd ==="ping" ) {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Ping`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage:\nTells you your current ping.\nSyntax:\n${prefix}ping`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
        } else if (cmd === "shutdown") {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Shutdown`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage:\nAlso Kills the bot\nSyntax:\n${prefix}shutdown\nPermissions:\nDeveloper Only`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
            message.channel.send(`${prefix}shutdown\nUsage: Shutdowns the bot.\n Requirements: Be the dev`);
        } else if (cmd === "restart") {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Restart`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage:\nkills the bot.\nSyntax:\n${prefix}restart`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
            message.channel.send(`${prefix}restart\nUsage: Restarts the bot`);
        } else if (cmd === "help") {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Help`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`"Why the fuck do you need help with the help command?" - StationaryStation\n\nUsage:\nHelps You :/\nSyntax:\n${prefix}help <command>`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
        } else if (cmd === "ban") {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Ban`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage:\nBans a mentioned user permanently.\nSyntax:\n${prefix}ban <user>\nPermissions:\nBe an admin.`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
            message.channel.send(`${prefix}ban <UserID/User>\nUsage: Bans the user mentioned permanently\nRequirements: Be an admin`);
        } else if (cmd === "pootisfy" && config.stable == false) {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Pootisfy`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage: Changes your server nickname to pootis.\nSyntax: ${prefix}pootisfy <nickname>\nPermissions:\nYour admin should eliminate the changeNickname and manageNicknames permission.`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
        } else if (cmd === "changeusernick") {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Change Others Nickname`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage: Changes others server nickname.\nSyntax: ${prefix}changeusernick <user> <nickname>\nPermissions:\nYour admin should eliminate the changeNickname and manageNicknames permission.`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
        } else if (cmd === "changenick") {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Change Your Nickname`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage: Changes your server nickname.\nSyntax: ${prefix}changenick <nickname>\nPermissions:\nYour admin should eliminate the changeNickname and manageNicknames permission.`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
        } else if (cmd === "boop"){
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Boop`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage:\nBoops The mentioned user.\nSyntax:\n${prefix}boop <user>`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
        } else if (cmd === "devmedia") {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu: Developer Media`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Usage:\nLists stationaryStation's social media profiles.`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
        } else if (cmd === "" && config.stable == false) {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Commands:\ndevmedia\nboop\nchangenick\nchangeusernick\nban\nhelp\nrestart\nshutdown\nping\nkick`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
            // if no command was imputed, list all stable and unstable commands
        } else if (cmd === "" && config.stable == true) {
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Commands:\ndevmedia\nboop\nchangenick\nchangeusernick\nban\nhelp\nrestart\nshutdown\nping\nkick`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
                    message.channel.send(HelpEmbed)
        }else if (cmd === "" && config.branchNext == true){
            const HelpEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Help Menu`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Commands:\ndevmedia\nboop\nchangenick\nchangeusernick\nban\nhelp\nrestart\nshutdown\nping\nkick`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
            message.channel.send(HelpEmbed)
        }
         else if (cmd === "math") {
        const HelpEmbed = new Discord.MessageEmbed()
            .setColor('#FF0057')
            .setTitle(`Help Menu: Math`)
            .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
            .setDescription(`Usage:\nCalculates simple operations\nSyntax:\n${prefix}math <op> <num1> <num2>\nArguments:\n Op:\n  ADD\n  SUB\n  MULTI\n  DIV\n  POW\n  ROOT\n  MOD\n Num1:\n  Number\n Num2:\n  Number`)
            .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
        message.channel.send(HelpEmbed)
        }
       
    }
    // Shutdown command, Dev only
    if (command === "shutdown") {
        if (message.author.id === config.devID) {
            message.channel.send('Goodbye...').then(sentMessage => {
                sentMessage.react(':white_check_mark:')
                // eslint-disable-next-line no-undef
                process.exit();
            });
        } else {
            message.reply("HEY! You can't just shutdown myself! You need the author's permission!");
        }

    }
    // Restart command, unstable mode only
    if (command === "restart" && config.stable == false) {
        // eslint-disable-next-line no-undef
        process.exit();
    }
    // Nickname changer command, User mention.
    if (command === "changeusernick") {
        const memberToEdit = message.mentions.members.first();
        const newNickname = message.content.replace(`${prefix}changeusernick`, '').split(' ').pop().trim();
        memberToEdit.setNickname(newNickname);''

    }
    // Change your own nickname.
    if (command === "changenick") {
        const newNick = message.content.replace(`${prefix}changenick`, '').split(' ').pop().trim();
        message.member.setNickname(newNick);
    }
    // Lists Developer commands
    if (command === "devcommands") {
        message.channel.send(`Current Dev Commands:\n shutdown: Shutdowns the bot. If node.js mode is enabled, the bot will shutdown.\n st!restart: Restarts the bot, if you are the owner.\n st!checkmode: Lists the `);
    }
    // Lists The original developer's social media
    if (command === "devmedia") {
        message.channel.send(`Dev's twitter:\n https://twitter.com/dumplingfurry/\n Dev's StackOverflow:\n https://stackoverflow.com/users/15887961/stationarystation?tab=profile\n Dev's Github: https://github.com/stationaryStation `);
    }
    // Pootisfy Command
    if (command === "pootisfy") {
      const nick = 'pootis' // add nick as pootis
      message.member.setNickname(nick); // change the message author's nick to pootis
    }
    // Reset Nickname command, unstable mode only
    if (command === "resetnick"&& config.stable == false) { // Check if stable mode is false then run
        const nick = message.author.tag();
        message.member.setNickname(nick);
        
    }
    // Pings a selected user.
    if (command === "boop") {
        const userToPing = message.mentions.members.first()
        if (userToPing){
            const BoopSuccessful = new Discord.MessageEmbed()
            .setColor('#FF0057')
            .setTitle(`Boop!`)
            .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
            .setDescription(`${userToPing}, you Have been booped! ;p`)
            .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Boop.png`)
            message.channel.send(BoopSuccessful)
        } else {
            const BoopFailed = new Discord.MessageEmbed()
    .setColor('#FF0057')
    .setTitle(`>:(`)
    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
    .setDescription(`Please mention a user to ping/boop.`)
    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Boop.png`)
    message.channel.send(BoopFailed)
        }
    }
    // Issue command, unstable mode only
    if (command === "issue"&& config.stable == false) { // check if stable mode is false then run
        message.channel.send('https://github.com/stationaryStation/stationBot/issues');
        message.channel.send('Post your issues here. Also, here you can look at the code :depressed:');
    }
    // sends the github repo to your current channel
    if (command === "github") {
        message.channel.send('https://github.com/stationaryStation/stationBot/');
    }
    // Checks the current mode the bot is running.
    if (command === "checkmode") {
        if (config.stable == true) { // if unstable mode is true then say on the channel that unstable mode is on
            message.channel.send("Running on stable mode.");
        } else if (config.stable == false){ // if stable mode is true then say on the channel that stable mode is on
            message.channel.send("Running on unstable mode.");
        } else {
            message.channel.send("An unexpected error has occurred. Please report it with st!issue");
        }
    }
    // Math command
    if (command === 'math'){
        // Add variables for operations
        let op = args[0]
        let num1 = args[1]
        let num2 = args[2]

        // Make integer variables
        let parseNum1 = parseInt(num1)
        let parseNum2 = parseInt(num2)
        // Add answer variable
        let ans
        
        // If there is no operation, send the available operations and cancel request
        if (!op) {
            message.channel.send(`You need to specify the operation and the operands.\nAvailable Operations:\n sum\n res\n div\n multi\n pow\n root`);
        } else {
            if (op === "add"){
                if(!args[1] || !args[2]) {
                    // Send that you didn't specify num1 and num2
                    message.channel.send("You need to specify the operands.");
                } else {
                    // Send the answer after parsing num1 and num2
                    ans = parseNum1 + parseNum2
                    const SumAnswer = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Math`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your Answer is: ${ans}`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Plus.png`)
                    message.channel.send(SumAnswer)
                }

            } else if(op === "sub"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else{
                    ans = parseNum1 - parseNum2
                    const SubAnswer = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Math`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your Answer is: ${ans}`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Minus.png`)
                    message.channel.send(SubAnswer)
                }

            } else if(op === "multi"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else {
                    ans = parseNum1 * parseNum2
                    const MultiAnswer = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Math`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your Answer is: ${ans}`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Multi.png`)
                    message.channel.send(MultiAnswer)
                }

            } else if(op === "div"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else {
                    ans = parseNum1 / parseNum2
                    const DivAnswer = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Math`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your Answer is: ${ans}`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Math%20-%20%20Div.png`)
                    message.channel.send(DivAnswer)
                }

            }else if(op === "mod"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else {
                    ans = parseNum1 % parseNum2
                    message.channel.send(`Your answer is: ${ans}`)
                }

            }else if(op === "pow"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                } else {
                    ans = Math.pow(parseNum1, parseNum2);
                    message.channel.send(`Your answer is: ${ans}`)
                }

            }else if(op === "root"){
                if(!args[1] || !args[2]) {
                    message.channel.send("You need to specify the operands.");
                }else {
                    ans = Math.pow(parseNum1, 1/parseNum2);
                    message.channel.send(`Your answer is: ${ans}`)
                }

            }
        }

    }
    if (command === "changelog") {
        const Changelog = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`StationBot Changelog`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Ver ${config.botVer}:\nAdded Embeds in some commands\nAdded st!changelog\nAdded EmbedIcons designed by stationaryStation\nAdded st!cat to fetch cat images <3\nAdded st!urban to search up something in the urban dictionary`)
                    .setFooter('This bot is running in the NexT branch.')
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png`)
                    message.channel.send(Changelog)
    }
    if (command === "cat"){
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        message.channel.send(file);
    }
    if (command == "urban"){
        if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.json());
            if (!list.length) {
                return message.channel.send(`No results found for **${args.join(' ')}**.`);
            }
            const [answer] = list;
            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        const embed = new Discord.MessageEmbed()
	.setColor('#FF0057')
	.setTitle(answer.word)
	.setURL(answer.permalink)
	.addFields(
		{ name: 'Definition', value: trim(answer.definition, 1024) },
		{ name: 'Example', value: trim(answer.example, 1024) },
		{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
        )
    .setThumbnail('https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Urban.png');

        message.channel.send(embed);

	}
    if (command === "tenor") {
        const searchTerm = args[0]
        if (!searchTerm){
            const SearchFailed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Oops!`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your search term is misssing, please insert a valid search tearm.`)
                    .setFooter('Error 1')
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png`)
                    message.channel.send(SearchFailed);
        } else {
            let url = `https://g.tenor.com/v1/search?q=${searchTerm}&key=${config.TENOR_KEY}&limit=8`
            let response = await fetch(url);
            let json = await response.json();
            const index = Math.floor(Math.random() * json.results.length);
            message.channel.send(json.results[index].url);


        }
    }
    
    

}); 
// After that, login to the bot account.
client.login(config.BOT_TOKEN);

// Change bot's avatar and Username from config.json WIP
// client.user.setAvatar('https://raw.githubusercontent.com/stationaryStation/StationBot/master/ProfilePictures/V2%20(Account).png');
// client.user.setUsername(config.botUsername)