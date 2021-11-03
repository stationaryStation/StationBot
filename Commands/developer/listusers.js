module.exports = {
	name: "listusers",
	descriptions: "List users on this guild.",
	cooldown: 10,
	args: false,
	wip: true,
	execute(message) {
		const joinedMembers = message.guild.members.fetch().toArray()
		message.channel.send(`joined users: ${joinedMembers}`);
	}
}