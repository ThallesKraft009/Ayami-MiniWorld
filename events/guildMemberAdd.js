import { createWelcomeImage } from "../functions/welcomeImage.mjs"
/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "guildMemberAdd",

  run: async (client, member) => {

    let data = {
      avatar: member.displayAvatarURL({ extension: 'png', size: 1024 }),
      userId: member.id,
      channelId: client.config.channels.welcome,
      name: member.user.globalName || "teste",
      memberCount: member.guild.memberCount
    };

    createWelcomeImage(data);
    
  },
};