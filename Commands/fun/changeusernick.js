module.exports = {
    name: 'changeusernick',
    args: true,
    description: 'Changes other user\'s nickname',
    usage: '<user> <nickname',
    execute(message, args){
        const memberToEdit = message.mentions.members.first();
        const newNickname = message.content.replace(`${prefix}changeusernick`, '').split(' ').pop().trim();
        memberToEdit.setNickname(newNickname);
    }
}