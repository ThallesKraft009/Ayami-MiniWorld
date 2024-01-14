const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js")

module.exports = {
  customId: "inventario_",
  run: async(interaction, id) => {
    let verf = id.replace("inventario_", "");
    if (interaction.member.user.id !== verf){
     await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `Espere um minutinho... Você não é <@${verf}>! Sai daqui!`,
          flags: 64
        }
      }
      })
    }

    
    let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

    let value = interaction.data.values[0]

    if (value === "0"){
      await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 7,
          data: {
            embeds: [
              {
                title: "Lista de Blocos",
                description: `Madeiras: ${userdb.rpg.blocos.madeira}\nPedras: ${userdb.rpg.blocos.pedra}\nMinerio de Cobre: ${userdb.rpg.blocos.cobre}\nMinerio de Mithril: ${userdb.rpg.blocos.mithril}`,
                color: 255
              }
            ]
          }
        }
      })
    } else if (value === "1"){
      await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 7,
          data: {
            embeds: [
              {
                title: "Lista de Minérios",
                description: `Ingote de Cobre: ${userdb.rpg.ingotes.cobre}\nIngote de Mithril: ${userdb.rpg.ingotes.mithril}`,
                color: 255
              }
            ]
          }
        }
      })
    } else if (value === "2"){
      await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 7,
          data: {
            embeds: [
              {
                title: "Lista de Itens",
                description: `Gravetos: ${userdb.rpg.itens.gravetos}\nFornalha: ${userdb.rpg.itens.fornalha}\nFibras Vegetais: ${userdb.rpg.plantas.fibras_vegetais}`,
                color: 255
              }
            ]
          }
        }
      })
    }
  }
}