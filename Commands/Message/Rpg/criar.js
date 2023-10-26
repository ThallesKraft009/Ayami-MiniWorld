import { PermissionFlagsBits, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } from "discord.js";

import Collector from '../../../functions/collector.js';

import db from '../../../mongodb/user.js';

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "criar",
  description: "",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "",
  cooldown: 5,

  run: async (client, message, args, prefix) => {

    let userdb = await db.findOne({
         userID: message.author.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: message.author.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: message.author.id })
     }

    if (userdb.uid === null || userdb.uid === "Não definido") return message.reply({
            content: "Espera um minutinho... Você não salvou seu uid! Use **`mw!salvar-uid`** pra salvar!",
            ephemeral: true
          })

    let mundo = userdb.rpg.mundo;
      if (mundo === null) return message.reply({
        content: `Espera um minutinho..... Você ainda não criou seu mundo! Uss **\`mw!criar-mundo\`** <:chinelada:826103654201163826>`,
        ephemeral: true
      })

    let file = new AttachmentBuilder("image/criar.png");

    let select_menu = new ActionRowBuilder()
      .addComponents(
    new StringSelectMenuBuilder()
			.setCustomId('criar-itens')
			.setPlaceholder('Cartegorias')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Geral')
					.setDescription('Clique pra selecionar')
					.setValue('1'),
        new StringSelectMenuOptionBuilder()
					.setLabel('Ferramentas')
					.setDescription('Clique pra selecionar')
					.setValue('2'),
        new StringSelectMenuOptionBuilder()
					.setLabel('Armaduras')
					.setDescription('Clique pra selecionar')
					.setValue('3'),
        new StringSelectMenuOptionBuilder()
					.setLabel('Armas')
					.setDescription('Clique pra selecionar')
					.setValue('4'),
			)
    )

    let msg = await message.reply({
      content: `${message.author}`,
      files: [file],
      components: [select_menu]
    })


    let item;

  Collector(async(i) => {
   console.log(userdb.rpg.picaretas)
    if (i.isStringSelectMenu()){
      if (i.customId === "criar-itens"){
        if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })
        let value = i.values[0];

        if (value === "1"){

          let buttons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setLabel("Graveto")
            .setCustomId("criar-graveto")
            .setStyle(ButtonStyle.Secondary)
          )

          await i.update({
            components: [buttons, select_menu]
          })
        } else if (value === "2"){
          let buttons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setLabel("Picareta de Pedra")
            .setCustomId("criar-picareta-pedra")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setLabel("Picareta de Cobre")
            .setCustomId("criar-picareta-cobre")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setLabel("Picareta de Ferro")
            .setCustomId("criar-picareta-ferro")
            .setStyle(ButtonStyle.Secondary)
          )

          await i.update({
            components: [buttons, select_menu]
          })
        } else if (value === "3"){
          let buttons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setLabel("Armadura de Cobre")
            .setCustomId("criar-armadura-cobre")
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setLabel("Armadura de Ferro")
            .setCustomId("criar-armadura-ferro")
            .setStyle(ButtonStyle.Secondary)
          )

          await i.update({
            components: [buttons, select_menu]
          })
        }
      }
    }

    if (i.isButton()){
      if (i.customId === "criar-graveto"){
        if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })
        item = "graveto";

        let modal = new ModalBuilder()
			.setCustomId('criar-itens-modal')
			.setTitle('Criação de Itens');

      let option_quantidade = new TextInputBuilder()
			.setCustomId('number')
			.setLabel("Quantos itens você quer fazer?")
			.setStyle(TextInputStyle.Short);

        let options = new ActionRowBuilder()
          .addComponents(option_quantidade);

        modal.addComponents(options);

        await i.showModal(modal);
      } 
      if (i.customId === "criar-picareta-pedra"){
        if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

        let pedras = userdb.rpg.blocos.pedra;
        let gravetos = userdb.rpg.itens.gravetos;

        if (pedras < 3) return i.reply({
            content: `Espere um minutinho..Você tem apenas **\`${pedras}\`** pedras e você precisa de pelo menos **\`3\`** para criar uma picareta de pedra!`,
            ephemeral: true
          })
        if (gravetos < 2) return i.reply({
            content: `Espere um minutinho..Você tem apenas **\`${gravetos}\`** gravetos e você precisa de pelo menos **\`2\`** para criar uma picareta de pedra!`,
            ephemeral: true
          })
        

          let data = [];

          data.push(userdb.rpg.picaretas.pedra);

          data.push(100)

          userdb.rpg.blocos.pedra = userdb.rpg.blocos.pedra - 3;

          userdb.rpg.itens.gravetos = userdb.rpg.itens.gravetos - 2;

          await db.updateOne({
         userID: i.user.id
     }, { $set: {
         "rpg.blocos.pedra": userdb.rpg.blocos.pedra,
          "rpg.itens.gravetos": userdb.rpg.itens.gravetos,
            "rpg.picaretas.pedra": data
     }
     })

  return i.reply({
    content: `Você criou uma picareta de pedra que tem 100 de durabilidade.`,
    ephemeral: true
  })
        
        }
      if (i.customId === "criar-picareta-cobre"){

        if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })
        
        let cobres = userdb.rpg.ingotes.cobre;
        let gravetos = userdb.rpg.itens.gravetos;

        if (cobres < 3) return i.reply({
            content: `Espere um minutinho..Você tem apenas **\`${cobres}\`** ingotes de cobres e você precisa de pelo menos **\`3\`** para criar uma picareta de cobre!`,
            ephemeral: true
          })
        
        if (gravetos < 2) return i.reply({
            content: `Espere um minutinho..Você tem apenas **\`${gravetos}\`** gravetos e você precisa de pelo menos **\`2\`** para criar uma picareta de cobre!`,
            ephemeral: true
          })
        

          let data = [];

          data.push(userdb.rpg.picaretas.cobre);

          data.push(200)

          userdb.rpg.ingotes.cobre = userdb.rpg.ingotes.cobre - 3;

          userdb.rpg.itens.gravetos = userdb.rpg.itens.gravetos - 2;

          await db.updateOne({
         userID: i.user.id
     }, { $set: {
         "rpg.ingotes.cobre": userdb.rpg.ingotes.cobre,
          "rpg.itens.gravetos": userdb.rpg.itens.gravetos,
            "rpg.picaretas.cobre": data
     }
     })

  return i.reply({
    content: `Você criou uma picareta de cobre que tem 200 de durabilidade.`,
    ephemeral: true
  })
        
      } 
      if (i.customId === "criar-picareta-ferro"){

        if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })
                let ferros = userdb.rpg.ingotes.ferro;
        let gravetos = userdb.rpg.itens.gravetos;

        if (ferros < 3) return i.reply({
            content: `Espere um minutinho..Você tem apenas **\`${ferros}\`** ingotes de ferro e você precisa de pelo menos **\`3\`** para criar uma picareta de ferro!`,
            ephemeral: true
          })
         if (gravetos < 2) return i.reply({
            content: `Espere um minutinho..Você tem apenas **\`${gravetos}\`** gravetos e você precisa de pelo menos **\`2\`** para criar uma picareta de pedra!`,
            ephemeral: true
          })
        

          let data = [];

          data.push(userdb.rpg.picaretas.ferro);

          data.push(300)

          userdb.rpg.ingotes.ferro = userdb.rpg.ingotes.ferro - 3;

          userdb.rpg.itens.gravetos = userdb.rpg.itens.gravetos - 2;

          await db.updateOne({
         userID: i.user.id
     }, { $set: {
         "rpg.ingotes.ferro": userdb.rpg.ingotes.ferro,
          "rpg.itens.gravetos": userdb.rpg.itens.gravetos,
            "rpg.picaretas.ferro": data
     }
     })

  return i.reply({
    content: `Você criou uma picareta de ferro que tem 300 de durabilidade.`,
    ephemeral: true
  })

        
    }

      try {
    if (i.isModalSubmit()){
      if (i.customId === "criar-itens-modal"){
        

        let quantidade = i.fields.getTextInputValue("number")

    quantidade = Number(`${quantidade}`);

        if (!quantidade) return i.reply({
          content: `Espere um minutinho... **\`${i.fields.getTextInputValue("number")}\`** não é um número!`,
          ephemeral: true
        })


        if (item === "graveto"){

   let madeiras = userdb.rpg.blocos.madeira;

     if (madeiras < quantidade) return i.reply({
       content: `Você precisa de **\`${quantidade - madeiras}\`** para criar **\`${quantidade}\`** gravetos!`,
       ephemeral: true
     })

    userdb.rpg.itens.gravetos = userdb.rpg.itens.gravetos + quantidade;

    userdb.rpg.blocos.madeira = userdb.rpg.blocos.madeira - quantidade;

          await db.updateOne({
         userID: i.user.id
     }, { $set: {
         "rpg.blocos.madeira": userdb.rpg.blocos.madeira,
          "rpg.itens.gravetos": userdb.rpg.itens.gravetos
     }
     })

          return i.reply({
            content: `Você fabricou **\`${quantidade}\`** gravetos!`,
            ephemeral: true
          })
        }
      }
    }

      } catch (err) {
        console.log(err)
        }
  }})
    
  },
};

