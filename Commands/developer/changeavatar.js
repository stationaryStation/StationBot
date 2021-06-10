// module.exports = {
//     name: 'changeavatar',
//     description: `Changes the avatar of the bot`,
//     args: true,
//     usage: '<url>',
//     cooldown: 180,
//     wip: true,
//     execute(message, args, client) {
//         async function setPicture(picturePath) {
//             await client.user.setAvatar(picturePath).then(() => console.log('Avatar set!')).catch(console.error);
//           }
//         const url = args.join(' ')
//         if (!url) {
//             message.channel.send(`You didn't set an url!`)
//             return false;
//         } else {
//               try {
//                 setPicture(url)
//               } catch (error) {
//                 message.channel.send(`\`\`\`${error}\`\`\``);
//               }
//         }
//     }
// 
// }