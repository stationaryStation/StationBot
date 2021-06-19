module.exports ={
    name: 'test',
    args: false,
    description: 'Test Description',
    cooldown: 10,
    wip: true,
    execute(message, args) {
        const test = args[0]
        if (test){
            message.channel.send(`Argument: ${test}`)
        }else {
            message.channel.send (`No Arguments.`)
        }
    }
}