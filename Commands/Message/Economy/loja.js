import { PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

import Collector from "../../../functions/collector.js";

import LOJA_ITENS from "../../../settings/shop.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "loja",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    if (true) return message.reply({
      content: "ainda está sendo feito..."
    })

    let pg = 0;
    
    let botoes = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setEmoji("⬅️")
      .setCustomId("loja_0")
      .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
      .setLabel("Comprar")
      .setCustomId("LojaComprar")
      .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
      .setEmoji("➡️")
      .setCustomId("loja_1")
      .setStyle(ButtonStyle.Secondary)
    );

    let embed = new EmbedBuilder()
    .setAuthor({ name: `${message.author.globalName}`, iconURL: `${message.author.displayAvatarURL()}`})
    .setTimestamp()
    .setColor("Yellow")

    embed.setDescription("Clique nos botões para passar a página :D")

    let EMBEDS = [];

    let msg = await message.reply({
      embeds: [embed],
      components: [botoes],
      content: `${message.author}`
    })

    LOJA_ITENS.map(item => {
      let x = new EmbedBuilder()
                 .setTitle(`Item: ${item._name}`)
                 .addFields({
                   name: `Tipo de Item`,
                   value: `${item._type}`
                 },{
                   name: `Preço do Item`,
                   value: `${item._moedas}`
                 })

      if (item._type === "Skin"){
        x.setImage(item._image)
      }

      EMBEDS.push(x);
                 
    })

    Collector(async(i) => {

      if (i.isButton()){
        
      }
    })
  },
};
