import { PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js";

import collector from "../../../functions/collector.js";

/**

 * @type {import("../../../index.js").Mcommand}

 */

export default {

  name: "sugerir",

  description: "",

  userPermissions: PermissionFlagsBits.SendMessages,

  botPermissions: PermissionFlagsBits.SendMessages,

  category: "",

  cooldown: 5,



  run: async (client, message, args, prefix) => {

    const modal = new ModalBuilder()
			.setCustomId('sugestões')
			.setTitle('Sugestão para Ayami');

    let option_1 = new ActionRowBuilder()
    .addComponents(
      new TextInputBuilder()
      .setCustomId("x")
      .setLabel("Coloque sua sugestão aqui")
      .setStyle(TextInputStyle.Paragraph)
    );

    modal.addComponents(option_1);

    let botao = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel("Clique pra sugerir")
      .setCustomId("buttonSugerir")
      .setStyle(ButtonStyle.Success)
    );

    let msg = await message.reply({
      content: `Teve uma ideia brilhante para Ayami? Clique no botão e compartilhe sua sugestão!`,
      components: [botao]
    })

    collector(async(i) => {
      if (i.isButton()){
        if (i.customId === "buttonSugerir"){
          if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })


          await i.showModal(modal);
        }
      }

      if (i.isModalSubmit()){
   //     console.log("modal recebido")
        if (i.customId === "sugestões"){

      //    console.log("modal sugestões recebido")
     let data = i.fields.getTextInputValue('x');

      let channel = client.channels.cache.get("1175115004345856020")

          let embed = new EmbedBuilder()
          .setAuthor({ name: `${message.author.globalName}`, iconURL: `${message.author.displayAvatarURL()}`})
          .setTitle("Nova Sugestão Recebida")
          .setDescription(`${data}`)
          .setColor("Yellow")
          .setTimestamp()


          channel.send({
            embeds: [embed]
          })

            await i.reply({
              content: "Sua sugestão foi enviada!",
              ephemeral: true
            })
          
        }
      }
    })

  },

};