import { EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } from "discord.js";
import ms from "ms";
class MapaBuilder {
  constructor(client){
    this.client = client;
    this.data = [];
  }

  async newMap(msg, isInteraction, userId, uid){
  /*  if (isInteraction){
      await msg.reply({
        content: "Veja sua DM",
        ephemeral: true
      })
    } else {
      let response = await msg.reply({
        content: "Veja sua DM"
      })

      setTimeout(async() => {
       await response.delete();
      }, 10000)
    }*/

     let user = this.client.users.cache.get(userId)

    let embed = {};

    await user.send({
      content: "Me diga o nome de seu mapa..."
    }).then(async(response_1) => {
      let colector_1 = await response_1.channel.creterMessageCollector({ time: ms("5m") })

      colector_1.on("collect", (responseCollector) => {

        console.log("Recebido!")
      })
    })
  }
}



export { MapaBuilder };