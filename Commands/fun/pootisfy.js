module.exports = {
    name: 'pootify',
    args: false,
    description: 'Changes your name to pootis',
    execute(message) {
        const nick = 'pootis' // add nick as pootis
      message.member.setNickname(nick); // change the message author's nick to pootis
    }
}