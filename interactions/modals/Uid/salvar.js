 const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js");

module.exports = {
  customId: "uid",
  run: async function(interaction, id){

    let uid = interaction.data.components[0].components[0].value;

  //  console.log(sobremim)

    let userdb = await db.findOne({
         userID: interaction.member.user.id
     })
      
     if(!db){
         const newuser = new db({ userID: interaction.member.user.id })
         await newuser.save();
         
         useedb = await db.findOne({ userID: interaction.member.user.id })
     }

    await db.updateOne({
         userID: interaction.member.user.id
     }, { $set: {
  "uid": uid
     }
     })

    await DiscordRequest(CALLBACK.interaction.response(
        interaction.id, interaction.token
      ), {
        method: 'POST',
        body: {
          type: 4,
          data: {
            content: `Seu UID foi salvo pra ${uid}!`,
            flags: 64
          }
        }
      })
    
  }
                               }