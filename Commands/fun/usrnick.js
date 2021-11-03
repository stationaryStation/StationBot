module.exports = {
    name: 'usrnick',
    args: true,
    description: 'Changes other users\' nickname',
    usage: ' <mode> <user> <nickname>',
    cooldown: 180,
    wip: false,
    // eslint-disable-next-line no-unused-vars
    async execute(message, prefix, args){
        const mode = args[0]
        const user = message.mentions.members.first();
        const newNickname = args[2];
        if (mode === "show") {
            message.channel.send(`${user}'s Nickname:\n ${user.nickname}`);
        }else if (mode === "show" && !user) {
            message.channel.send(`Your nickname:\n ${message.user.nickname}`);
        }else if (mode === "change") {
            if(!user) {
                message.channel.send('You need to specify an actual user (that exists and is here with you)')
            } else if (!newNickname) {
                message.channel.send('Where is the nickname? Because I don\'t see one.')
            } else {
                try {
                user.setNickname(newNickname)
                }catch(error){
                    message.channel.send(`\`\`\`${error}\`\`\``)
                }   
            }
        }        
    }
}