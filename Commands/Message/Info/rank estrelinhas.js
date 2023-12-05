import { RankImage } from "../../../functions/rank.mjs";
import { PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import Collector from "../../../functions/collector.js"
/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "estrelinhas-rank",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    let response;

    const send = (msg, edit, x, y, ver) => {
    response = RankImage(client, {
      isInteraction: ver,
      interaction: message,
      response: msg,
      type: "estrelinhas",
      slice: {
        x: x,
        y: y
      },
      edit: edit,
      buttons: new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setEmoji("⬅️")
        .setCustomId("rankBack")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setEmoji("➡️")
        .setCustomId("rankNext")
        .setStyle(ButtonStyle.Secondary)
      )
    })
}

    send(message, false, 0, 5, false);
    //console.log(response.id)
    let x = 0;
    let y = 5;

    Collector(async(i) => {
      if (i.isButton()){
        if (i.customId === "rankNext"){

          x = x + 5;
          y = y + 5;

          await i.deferUpdate()
          await i.followUp({
            content: "Carregando....",
            ephemeral: true
          })

          try {
             send(i, true, x, y, true)
          } catch (err) {
            await i.followUp({
              content: "Não foi possível carregar a nova página."
            })
          }
        } else if (i.customId === "rankBack"){
          x = x - 5
          y = y - 5

          if (y === 0) y = 5
          if (x < 0) x = 0

          await i.deferUpdate()

          i.followUp({
            content: "Carregando...",
            ephemeral: true
          })

          try {
            send(i, true, x, y, true)
          } catch (err) {
            i.followUp(
              {
                content: "Não foi possível carregar a página...",
                ephemeral: true
              }
            )
          }
        }
      }
    })
  },
};
            