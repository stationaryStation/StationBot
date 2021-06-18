module.exports = {
  name: 'onReady',
  once: true,
  execute(client, isBranchNext, isStable, botVer, isPreRelease) {
    console.log(`Logged in as ${client.user.tag}.\n Ver: ${botVer}\n Prefix: ${prefix}`);
    console.log('Bot ready for operation.');
    if (config.stable == true){
      client.user.setActivity(`${prefix}help for command list. | Using Current Branch`, {
          type: 'LISTENING'
       });
    } else if (isStable == false) {
      client.user.setActivity(`${prefix}help for command list. | Using Unstable Branch`, {
          type: 'LISTENING'
       });
    }else if (isBranchNext == true){
      client.user.setActivity(`${prefix}help for command list. | Using Next Branch`, {
          type: 'LISTENING'
       });
    }else if (isPreRelease == true){
      client.user.setActivity(`${prefix}help for command list. | Pre-Release`, {
          type: 'LISTENING'
       });
    } else {
        // This is just in case of the bot breaking.
        console.error("An unexpected error has ocurred. Please report the issue to https://github.com/stationaryStation/stationBot/issues");

        // And then after trowing the error, close StationBot.
        process.exit();
    }
  }
}
