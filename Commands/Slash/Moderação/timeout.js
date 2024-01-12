const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const ms = require("ms");
const moddb = require("../../../mongodb/analise.js")
module.exports = {
  data: {
    name: "membro",
    description: "Comandos relacionados a punição e usuário",
    type: 1,
    default_member_permissions: 1 << 1,
    options: [{
      name: "timeout",
      description: "Silencie um membro",
      type: 1,
      options: [{
        name: "membro",
        description: "Insira o ID do Membro ou mencione",
        type: 6,
        required: true
      },{
        name: "tempo",
        description: "Insira o tempo do timeout",
        type: 3,
        focused: true,
        required: true,
        autocomplete: true
      }]
    },{
      name: "analisar",
      description: "Ative uma analise de atividades de um usuário ",
      type: 1,
      options: [{
        name: "membro",
        description: "Insira o ID ou mencione o membro",
        type: 6,
        required: true
      },{
        name: "dias",
        description: "Por quanto tempo devo ficar de olho nesse usuário? Tempo em dias.",
        type: 10,
        required: true
      }]
    }]
  },
  run: async(interaction) => {

    let subCmd = interaction.data.options[0].name;

    if (subCmd === "analisar"){

      let userId = interaction.data.options[0].options[0].value;

      let tempo = interaction.data.options[0].options[1].value;

      let userdb = await moddb.findOne({
        userID: userId
      });

      if (!userdb){
        let newuser = new moddb({
          userID: userId
        });

        await newuser.save();

        userdb = await moddb.findOne({
        userID: userId
      });
      }

      

      await DiscordRequest(
  CALLBACK.guild.userGet(
    interaction.guild_id, 
    userId), {
      method: "GET"
  }).then(async(x) => {
  let membro = await x.json();

      await DiscordRequest(`/guilds/1088390786690846752/channels`,{
        method: "POST",
        body: {
          type: 0,
          name: `${membro.user.username}`,
          parent_id: "1193538427438780476"
        }
      }).then(async(channelData) => {
        let channel = await channelData.json();
        //console.log(channel)

        await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
          method: "POST",
          body: {
            type: 4,
            data: {
              content: `A análise será feita por ${tempo} dias no canal <#${channel.id}>!`,
              flags: 64
            }
          }
        })

        userdb.channelID = channel.id;
      //  console.log(membro);

        await DiscordRequest(`/channels/${channel.id}/webhooks`,{
          method: "POST",
          body: {
            name: membro.user.username,
            avatar: `https://cdn.discordapp.com/avatars/${membro.user.id}/${membro.user.avatar}.png`
          }
        }).then(async(webhookData) => {
          let webhook = await webhookData.json();

          userdb.webhook = `/webhooks/${webhook.id}/${webhook.token}`;

          await DiscordRequest(`/webhooks/${webhook.id}/${webhook.token}`, {
            method: "POST",
            body: {
              embeds: [{
                title: "Iniciando Análise",
                description: `Estou recebendo uma análise por ${tempo} dias!`,
                color: 250,
                footer: {
                  text: `${membro.user.username} | ${membro.user.id}`,
                  iconURL: `https://cdn.discordapp.com/avatars/${membro.user.id}/${membro.user.avatar}.png`
                }
              }]
            }
          })

             userdb.tempo = Date.now() + ms(`${tempo}d`);

          await userdb.save();
        })
      })
      })
    }

    if (subCmd === "timeout"){

      let userId = interaction.data.options[0].options[0].value;
      let tempo = ms(`${interaction.data.options[0].options[1].value}`);

      let data = new Date();
      data.setMilliseconds(data.getMilliseconds() + tempo);

      await DiscordRequest(`/guilds/751534674723078174/members/${userId}`, {
        method: "PATCH",
        body: {
          communication_disabled_until: data.toISOString()
        }
      });

      await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               content: `O membro <@${userId} foi silenciado com suceso.`,
               flags: 64
             }
           }
        })
    }
}
};