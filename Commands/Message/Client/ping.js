import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "ping",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

  let gatewayPing = client.ws.ping;

   /* let square = new SquareCloud({
      token: client.token,
      api_key: client.config.hospedagem.apiKey,
      api_id: client.config.hospedagem.apiId
    })*/

    const options = {
      method: 'GET', 
      headers: {
        Authorization: `${client.config.hospedagem.apiKey}`
      }
    };

fetch(`https://api.squarecloud.app/v2/apps/${client.config.hospedagem.apiId}`, options)
  .then(response => response.json())
  .then(async(data) => {
    
    let apiPing = Date.now() - message.createdTimestamp;

    let shard = message.guild.shardId;
    
    return message.reply({
      content: "Ping?"
    }).then(async(x) => {
      x.edit({
        content: `🏓 Pong! (📡 Cluster: **\`${data.response.app.cluster}\`**, Shard: **\`${shard}/5\`**)\n⏰ | Gateway Ping: **\`${gatewayPing}ms\`**\n⚡ | API Ping: **\`${apiPing}ms\`**`
      })
    })
  })
  },
};