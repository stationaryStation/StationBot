module.exports = {
    name: 'resetnick',
    args: false,
    execute(message, args){
        const nick = message.author.tag;
        message.member.setNickname(nick);
    }
}