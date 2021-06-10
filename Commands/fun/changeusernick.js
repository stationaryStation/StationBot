module.exports = {
    name: 'changeusernick',
    args: true,
    description: 'Changes other user\'s nickname',
    usage: '<user> <nickname',
    cooldown: 180,
    wip: false,
    // eslint-disable-next-line no-unused-vars
    async execute(message, prefix){
        const memberToEdit = message.mentions.members.first();
        const newNickname = message.content.replace(`${prefix}changeusernick`, '').split(' ').pop().trim();
        if(!memberToEdit) {
            message.channel.send('You need to specify an actual user (that exists and is here with you)')
        } else if (!newNickname) {
            message.channel.send('Where is the nickname? Because I don\'t see one.')
        } else {
            try {
            memberToEdit.setNickname(newNickname)
            }catch(error){
                message.channel.send(`\`\`\`${error}\`\`\``)
            }   
        }
        
    }
}