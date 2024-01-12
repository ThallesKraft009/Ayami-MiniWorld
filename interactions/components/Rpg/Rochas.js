const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js")

module.exports = {
  customId: "coletarRochas_",
  run: async(interaction, id) => {
    let verf = id.replace("coletarRochas_", "");
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

    userdb.rpg.blocos.pedra += 1;

    await userdb.save();

    await DiscordRequest(
      CALLBACK.interaction.response(
        interaction.id, interaction.token
      ),{
        method: "POST",
        body: {
          type: 7,
          data: {
            content: `Você coletou **__1__** rocha e agora tem **\`${userdb.rpg.blocos.pedra}\`** rochas!`
          }
        }
      }
    )
  }
}