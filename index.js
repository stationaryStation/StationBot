const Discord = require('discord.js');
const config = require('./config.json');
const required = require('./token.json')
const fs = require('fs');
// Required variables
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./Commands')

for (const file of commandFolders) {
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles){
        const command = require(`./Commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
const prefix = config.prefix
const fetch = require('node-fetch');
const querystring = require('querystring');

function GetQuote() {
    return fetch("https://zenquotes.io/api/random")
    // Get A quote from zenquotes and send data to a json file.
    .then(res => {
      return res.json()
      })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}
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
  }else if (config.PreRelease == true){
    client.user.setActivity(`${prefix}help for command list. | Pre-Release`, {
        type: 'LISTENING'
     });
  } else {
      // This is just in case of the bot breaking.
      console.error("An unexpected error has ocurred. Please report the issue to https://github.com/stationaryStation/stationBot/issues");
      process.exit();
  }
  
});
// When a message is sended in a guild(Server), it will be logged on the console/output
client.on("message", async message => {
    console.log(`${message.author.tag} at ${message.guild.name} said: ${message.content}\n`);

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try{
        command.execute(message, args);
    } catch (error) {
        const InvalidEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Invalid Command`)
                    .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Sorry, You need to enter a valid Command :(`)
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20InvalidCommand.png`)
        console.error(error);
        message.channel.send(InvalidEmbed)
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
        } else if (cmd === "pootisfy" && config.stable == false ||cmd === "pootisfy" && config.branchNext == true) {
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
        }else if (cmd === "math") {
        const HelpEmbed = new Discord.MessageEmbed()
            .setColor('#FF0057')
            .setTitle(`Help Menu: Math`)
            .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
            .setDescription(`Usage:\nCalculates simple operations\nSyntax:\n${prefix}math <op> <num1> <num2>\nArguments:\n Op:\n  ADD\n  SUB\n  MULTI\n  DIV\n  POW\n  ROOT\n  MOD\n Num1:\n  Number\n Num2:\n  Number`)
            .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
        message.channel.send(HelpEmbed)
        } else if (cmd === "tenor"){
            const HelpEmbed = new Discord.MessageEmbed()
            .setColor('#FF0057')
            .setTitle(`Help Menu: Tenor`)
            .setAuthor(`StationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
            .setDescription(`Usage:\nSearches a gif in tenor.com\nSyntax:\n${prefix}tenor <searchTerm>`)
            .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Help.png`)
        message.channel.send(HelpEmbed)
        }
       
    }
    // Pootisfy Command
    if (command === "pootisfy") {
      const nick = 'pootis' // add nick as pootis
      message.member.setNickname(nick); // change the message author's nick to pootis
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
    if (command === "changelog") {
        embeds.changelog()
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
        const searchTerm = args.join(' ')
        // searchTerm is a argument which means that the syntax is st!tenor <searchTerm>
        if (!searchTerm){
            const SearchFailed = new Discord.MessageEmbed()
                    .setColor('#FF0057')
                    .setTitle(`Oops!`)
                    .setAuthor(`stationBot ${config.botVer}`, `https://user-images.githubusercontent.com/81704775/118518156-d919d380-b705-11eb-9145-bb282e626d3a.png`)
                    .setDescription(`Your search term is misssing, please insert a valid search tearm.`)
                    .setFooter('Error 1')
                    .setThumbnail(`https://raw.githubusercontent.com/stationaryStation/StationBot/Next/Embeds/Bot%20Info.png`)
                    message.channel.send(SearchFailed);
                    console.log(`${message.author.tag} searched on tenor ${searchTerm} but failed.`)
        } else {
            let url = `https://g.tenor.com/v1/search?q=${searchTerm}&key=${config.TENOR_KEY}&limit=8`
            let response = await fetch(url);
            let json = await response.json();
            const index = Math.floor(Math.random() * json.results.length);
            message.channel.send(json.results[index].url);
            console.log(`${message.author.tag} searched on tenor ${searchTerm}.`)
        }
    }
    if (command === "inspire"){
        // Fetch a random quote from zenquotes's api. Then, send it. 
        GetQuote().then(quote => message.channel.send(quote))
    }
    
    

}); 
// After that, login to the bot account.
client.login(required.BOT_TOKEN);

// Change bot's avatar and Username from config.json WIP
// client.user.setAvatar('https://raw.githubusercontent.com/stationaryStation/StationBot/master/ProfilePictures/V2%20(Account).png');
// client.user.setUsername(config.botUsername)