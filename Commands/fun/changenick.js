module.exports ={
    name: 'changenick',
    args: true,
    usage: '<nickname>',
    description: 'Changes your nickname',
    // eslint-disable-next-line no-unused-vars
    execute(message, args, prefix, botVer){
        const newNick = message.content.replace(`${prefix}changenick`, '').split(' ').pop().trim();
        message.member.setNickname(newNick);
    }
}