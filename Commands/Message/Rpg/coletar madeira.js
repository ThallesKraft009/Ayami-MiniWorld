import { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder } from "discord.js";

import Collector from '../../../functions/collector.js'

import db from '../../../mongodb/user.js'

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "coletar-madeira",
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
    

    const data = {};
    const embed = new EmbedBuilder()
    .setColor("Random")
    .setAuthor({name: `${message.author.globalName}`, iconURL: `${message.author.displayAvatarURL()}`})

    const update = async(func) => {

      let mapa = "0123456789";

      mapa = mapa.replace(`${data.player.x}`, "(p)")

      

data.arvores.map(x => {
  mapa = mapa.replace(`${x.x}`, "🌲")
})



      for (let i = 0; i < 10; i++){
        mapa = mapa.replace(`${i}`, "⬛");
        continue;
      }

      mapa = mapa.replace("(p)", `${userdb.skin}`)
    

      embed.setDescription(`Madeiras Coletadas: ${data.madeiras}\n\n${mapa}`)

    }

  const salvar = async() => {
    userdb.rpg.blocos.madeira = userdb.rpg.blocos.madeira +1;

    await db.updateOne({
         userID: message.author.id
     }, { $set: {
         "rpg.blocos.madeira": userdb.rpg.blocos.madeira
     }
     })
  }

  const verificacao = async() => {

  if (!data.arvores || data.arvores.length < 1) for (let i = 0; i < 4; i++){
      data.arvores.push({
        x: Math.floor(Math.random() * 10)
      })

      continue;
    };


for (let i = 0; i < data.arvores.length; i++) {
  if (data.player.x === data.arvores[i].x) {
    data.arvores.splice(i, 1);
    i--;
    data.madeiras = data.madeiras + 1;
    salvar();
  }
}

  }


    data.player = {};
    data.player.x = 0;
    data.arvores = [];

    for (let i = 0; i < 4; i++){
      data.arvores.push({
        x: Math.floor(Math.random() * 10)
      })

      continue;
    };

    data.madeiras = 0;

    update()

    let buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setEmoji("⬅️")
      .setCustomId("voltar-madeira")
      .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
      .setEmoji("➡️")
      .setCustomId("andar-madeira")
      .setStyle(ButtonStyle.Secondary)
    )

    let msg = await message.reply({
      embeds: [embed],
      components: [buttons],
      content: `${message.author}`
    })

    Collector(async(i) => {
      if (i.isButton()){
        if(i.customId==="andar-madeira"){

  if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

          data.player.x = data.player.x + 1;
          if (data.player.x === 10) data.player.x = 0;
          verificacao();
          update()
          i.update({
            embeds: [embed]
          })
        }
        if(i.customId==="voltar-madeira"){

                   if (i.message.id !== msg.id) return;
          if (i.user.id !== message.author.id) return i.reply({
            content: `Espera um minutinho... Você não é ${message.author}! Sai daqui!`,
            ephemeral: true
          })

          data.player.x = data.player.x - 1;
          if (data.player.x === -1) data.player.x = 9;
          verificacao();
          update()
          i.update({
            embeds: [embed]
          })
           }
      }
    })
    
  },
};
