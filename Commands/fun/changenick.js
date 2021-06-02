module.exports ={
    name: 'changenick',
    args: true,
    usage: '<nickname>',
    description: 'Changes your nickname',
    execute(message, args){
        const newNick = message.content.replace(`${prefix}changenick`, '').split(' ').pop().trim();
        message.member.setNickname(newNick);
    }
}