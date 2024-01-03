const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");

module.exports = {
  customId: "msg_",
  run: async(interaction, id) => {

    let data = id.split("_");
    
    let channelId = data[1];
    let messageId = data[2];

    await DiscordRequest(CALLBACK.channel.getMessage(channelId, messageId),{
      method: "GET"
    }).then(async(response) => {
      let msg = await response.json();

  //  console.log(msg)


    let timestamp = new Date(msg.timestamp)
    let emojis = ``
      let content;

      if (msg.content.length > 300){
        content = "O conteúdo da mensagem tem mais de 300 caracteres."
      } else {
        content = msg.content
      }

      let color = 15631086;

      if (msg.reactions.length !== 0){
      
      msg.reactions.forEach((x) => {
     //   console.log(emoji.name, emoji.id)
        let emoji = x.emoji
        if (emoji.id !== null){
          emojis = emojis + `<:${emoji.name}:${emoji.id}>`
        } else {
          emojis = emojis + emoji.name
        }
      })
      } else {
        emojis = "Nenhuma reação achada."
      }

      

     // console.log(emojis)
      let embed = {
        title: "Informações da Mensagem",
        fields: [{
          name: "**Conteúdo da Mensagem**",
          value: `${content}`
        },{
          name: "**Author da Mensagem**",
          value: `${msg.author.global_name} | ${msg.author.id}`
        },{
          name: "Total de Reações",
          value: `${msg.reactions.length}\n\n${emojis}`
        },{
          name: "Canal da mensagem",
          value: `<#${msg.channel_id}>`
        }],
        color: color
      };

        await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               embeds: [embed],
               flags: 64
             }
           }
        })
    })
  }
}