const fs = require('fs')
function getFile(filename){
	var data = fs.readFileSync(filename)
	return data
}

module.exports = {
	name: 'k',
	description: 'developer config',
	wip: true,
	dev: true,
	execute(message, args) {
		const config = args[0].toLowerCase()
		if (message.author.id === '567014451337887744') {
			if (config === "cp"){
				message.channel.send("Command not complete.")	
			}			
		} else {
			message.reply("Command Available only to StationaryStation.\nReason:**Command Marked as Developer Only**")
		  }
	}
}