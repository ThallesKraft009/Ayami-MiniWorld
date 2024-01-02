const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const ms = require("ms");

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
    }]
  },
  run: async(interaction) => {

    let subCmd = interaction.data.options[0].name;

    if (subCmd === "timeout"){

      let userId = interaction.data.options[0].options[0].value;
      let tempo = ms(`${interaction.data.options[0].options[1].value}`);

      let data = new Date();
      data.setMilliseconds(data.getMilliseconds() + tempo);

      await DiscordRequest(`/guilds/1088390786690846752/members/${userId}`, {
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