import { EmbedBuilder, WebhookClient } from 'discord.js';
/**
 * @type {import("..").EventHandler}
 */

const url = "https://discord.com/api/webhooks/1149299083022979182/Wd2zU74l2jFKcSwM2ZRdjQywLM53VKA0CTUB5ztGMxmaWbKCVxTo7r5wZWqMxEAlEu_L";


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