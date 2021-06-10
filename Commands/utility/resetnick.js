module.exports = {
    name: 'resetnick',
    args: false,
    // eslint-disable-next-line no-unused-vars
    execute(message, args){
        const nick = message.author.tag;
        message.member.setNickname(nick);
    }
}