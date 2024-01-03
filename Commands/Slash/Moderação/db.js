const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js")


module.exports = {
  data: {
    name: "database",
    description: "Gerenciamento do Banco de dados",
    type: 1,
    default_member_permissions: 1 << 5,
    options: [{
      name: "mensagens",
      description: "Edite o valor de mensagens de algum usuário",
      type: 1,
      options: [{
        name: "usuário",
        description: "Mencione o membro",
        type: 6,
        required: true
      },{
        name: 'mensagem',
        description: "Nova quantidade de mensagens",
        type: 10,
        required: true
      }]
    }]
  },

  run: async(interaction) => {

    let subCmd = interaction.data.options[0].name;

    if (subCmd === 'mensagens'){
      let userId = interaction.data.options[0].options[0].value

      let quantidade = Number(`${interaction.data.options[0].options[1].value}`);

      let userdb = await db.findOne({
        userID: userId
      })

      if (!userdb){
        let newuser = new db({
          userID: userId
        })

        await newuser.save();

        userdb = await db.findOne({
        userID: userId
      })
      }

      userdb.msg.de_2024 = userdb.msg.de_2024 + quantidade;

      await userdb.save();

      await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               content: `Mensagens adicionados!`,
               flags: 64
             }
           }
        })
    }
  }
}