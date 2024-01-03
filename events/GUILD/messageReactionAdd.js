const CALLBACK = require("../../settings/callback.js");
const DiscordRequest = require("../../settings/request.js");
const ms = require('ms');
let dbMsg = require("../../mongodb/msg.js");
let db = require("../../mongodb/user.js")
let channelLogId = "788359527657373717"
let channelEstrelinhaId = "751536510347509801"
let channelWarns = "751666646703276063"

const MessageReactionAdd = async(data) => {
  let reaction = data.d;
  //console.log(reaction.emoji)

 // console.log(reaction)
  let emoji;
  if (reaction.emoji.id !== null){
    emoji = `<:${reaction.emoji.name}:${reaction.emoji.id}>`
  } else {
    emoji = reaction.emoji.name
  }
  
  await DiscordRequest(CALLBACK.message.response(
    channelLogId
  ),{
    method: "POST",
    body: {
      embeds: [{
        title: "Log de Reações",
        description: `Reação ${emoji} adicionada por ${reaction.member.user.global_name}`,
        color: 255
      }],
      components: [{
        type: 1,
        components: [{
          type: 2,
          label: "Informações da Mensagem",
          style: 2,
          custom_id: `msg_${reaction.channel_id}_${reaction.message_id}`
        }]
      }]
    }
  })

  if (reaction.emoji.name === "🖕"){

    await DiscordRequest(CALLBACK.message.reaction.remove(reaction.channel_id, reaction.message_id, "🖕"),{
      method: "DELETE"
    })

    await DiscordRequest(CALLBACK.message.response(channelWarns),{
      method: "POST",
      body: {
        embeds: [{
          title: "Reação Inadequado.",
          description: `Reação ${reaction.emoji.name} foi adicionada por ${reaction.member.user.global_name} (${reaction.member.user.id}) em <#${reaction.channel_id}>!`,
          color: 16711680
        }]
      }
    })

    let time = new Date()
    time.setMilliseconds(time.getMilliseconds() + ms("1m"));
    

    await DiscordRequest(`/guilds/${reaction.guild_id}/members/${reaction.member.user.id}`, {
        method: "PATCH",
        body: {
          communication_disabled_until: time.toISOString()
        }
      });

  }

  if (reaction.emoji.name === "⭐"){

    if (reaction.member.user.bot) return;

    await DiscordRequest(CALLBACK.channel.getMessage(reaction.channel_id, reaction.message_id),{
      method: "GET"
    }).then(async(response) => {
      let msg = await response.json();

      if (msg.author.bot) return;
    //  if (msg.author.id === reaction.member.user.id) return;
     // console.log(msg)

   let user = await DiscordRequest(CALLBACK.guild.userGet(reaction.guild_id, msg.author.id),{
   method: "GET"
   });

      user = await user.json();
      let roles = []

      
       let role = await DiscordRequest(CALLBACK.guild.rolesGet(reaction.guild_id),{ method: "GET" })

        role = await role.json();

        roles.push(role);

      let roleUser;

    for (let i = role.length - 1; i >= 0; i--){

      if (user.roles.includes(role[i].id)){
        roleUser = role[i]

        
      }
      continue;
    }

    
      
    let msgdb = await dbMsg.findOne({
      msgID: reaction.message_id
    })

      if (!msgdb){
        let newMsg = new dbMsg({
          msgID: reaction.message_id
        })

        await newMsg.save();

        msgdb = await dbMsg.findOne({
      msgID: reaction.message_id
    })


        



      }

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
      let embed = {
        author: {
          name: `${msg.author.global_name}`,
          icon_url: `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`
        },
        description: `${msg.content}`,
        color: roleUser.color
      }

      msgdb.reactions = msgdb.reactions + 1;

      if (msgdb.reactions === 1){

        userdb.estrelas = userdb.estrelas + 1
      await DiscordRequest(CALLBACK.message.response(channelEstrelinhaId),{
        method: "POST",
        body: {
          embeds: [embed],
          content: `⭐ - <#${reaction.channel_id}>`,
          components: [{
            type: 1,
            components: [{
            label: "Ir para a mensagem",
            type: 2,
            style: 5,
            url: `https://discord.com/channels/${reaction.guild_id}/${reaction.channel_id}/${reaction.message_id}`
            }]
          }]
        }
      }).then(async(dataMsg)=>{
        let responseMsg = await dataMsg.json()

        msgdb.msg_bot_id = responseMsg.id

        
      })
      }

      await msgdb.save();
    })
  }
}

module.exports = { MessageReactionAdd }