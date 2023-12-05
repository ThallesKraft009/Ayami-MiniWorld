import { EmbedBuilder, WebhookClient } from 'discord.js';
/**
 * @type {import("..").EventHandler}
 */

export default {
  name: "debug",

  run: async (client, info) => {

    let embed = new EmbedBuilder()
    .setTitle("**Client Debug (shard)**")
    .setDescription(`${info}`)
    .setColor("Blue")
    .setTimestamp()

    //console.log(info)
    
/* const webhookClient = new WebhookClient({ 
  url: `${url}` 
});

    webhookClient.send({
      content: `**Client Debug**:**\`\`\`js\n${info}\n\`\`\`**`
    })*/
  },
};