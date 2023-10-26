import { PermissionFlagsBits, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder } from "discord.js";

import Collector from '../../../functions/collector.js';

import db from '../../../mongodb/user.js';

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "criar-mundo",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    let file = new AttachmentBuilder("image/criar-mundo.png")

    let botoes = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel("Criar Mundo")
      .setCustomId("criar-mundo")
      .setStyle(ButtonStyle.Primary)
    );

    let userdb = await db.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: message.author.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: message.author.id })
     }
    

    let msg = await message.reply({
      content: `${message.author}`,
      files: [file],
      components: [botoes]
    })

    Collector(async(i) => {
      if (i.isButton()){
        if (i.customId === "criar-mundo"){
          if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

          if (userdb.uid === null || userdb.uid === "Não definido") return i.reply({
            content: "Espera um minutinho... Você não salvou seu uid! Use **`mw!salvar-uid`** pra salvar!",
            ephemeral: true
          })

       const modal = new ModalBuilder()
			.setCustomId('criar-mundo_m')
			.setTitle('Criação de Mundo');

      const nome = new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
			.setCustomId('1')
			.setLabel("Qual o nome de seu Mundo?")
  		.setStyle(TextInputStyle.Short)
      .setPlaceholder("Insira o nome!")
      );

      modal.addComponents(nome)


          await i.showModal(modal);
  
        }
      }

      if (i.isModalSubmit()){
        if (i.customId === "criar-mundo_m"){
         let name = i.fields.getTextInputValue('1')


        
        await db.updateOne({
         userID: i.user.id
     }, { $set: {
         "rpg.mundo": name
     }
     })
    
          return i.update({
            content: `${i.user} | Mundo Criado.`,
            components: []
          })
        }
      }
    })
    
  },
};
              