module.exports = {
    name: 'changeusernick',
    args: true,
    description: 'Changes other user\'s nickname',
    usage: '<user> <nickname',
    // eslint-disable-next-line no-unused-vars
    execute(message, args, botVer, prefix){
        const memberToEdit = message.mentions.members.first();
        const newNickname = message.content.replace(`${prefix}changeusernick`, '').split(' ').pop().trim();
        memberToEdit.setNickname(newNickname);
    }
}