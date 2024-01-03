const dbmsg = require("../../mongodb/msg.js");
const db = require("../../mongodb/user.js");
const CALLBACK = require("../../settings/callback.js");
const DiscordRequest =  require("../../settings/request.js")
let channelEstrelinhaId = "751536510347509801";

const MessageReactionRemove = async(data) => {
  let reaction = data.d;

  if (reaction.emoji.name === "⭐"){
    let msgdb = await dbmsg.findOne({
      msgID: reaction.message_id
    });

    if (!msgdb){
      let newMsg = new dbmsg({
        msgID: reaction.message_id
      })

      await newMsg.save();

      msgdb = await dbmsg.findOne({
      msgID: reaction.message_id
    });
    }
    msgdb.reactions = msgdb.reactions - 1;
       await msgdb.save();
    if (msgdb.reactions === 0){

      await DiscordRequest(`/channels/${channelEstrelinhaId}/messages/${msgdb.msg_bot_id}`,{
        method: "DELETE"
      })

      await DiscordRequest(CALLBACK.channel.getMessage(reaction.channel_id, reaction.message_id),{
      method: "GET"
    }).then(async(response) => {
      let msg = await response.json();

        let userdb = await db.findOne({
          userID: msg.author.id
        })

        if (!userdb){
          let newUser = new db({
            userID: msg.author.id
          })

          await newUser.save();

          userdb = await db.findOne({
          userID: msg.author.id
        })
        }

        userdb.estrelas = userdb.estrelas - 1;
        await userdb.save();

      })
    }
  }
}

module.exports = { MessageReactionRemove };