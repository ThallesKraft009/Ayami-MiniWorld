const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js");

module.exports = {
  data: {
    name: 'pontos',
    description: "Comandos do evento",
    type: 1,
    options: [{
      name: "ver",
      description: "Veja quantos pontos você tem",
      type: 1,
      options: [{
        name: "membro",
        description: "Mencione um membro",
        type: 6,
        required: false
      }]
    },{
      name: "rank",
      description: "Veja o rank de pontos",
      type: 1
    }]
  },

  run: async(interaction) => {

    let subCmd = interaction.data.options[0].name;

    if (subCmd === "rank") {
      let userdb = await db.find({});

      userdb.sort((a, b) => (b.carnaval_pontos_2024 + b.carnaval_pontos_2024) - (a.carnaval_pontos_2024 + a.carnaval_pontos_2024));

      userdb = userdb.slice(0, 20);

      let embed = {
        title: "Rank de Pontos",
        description: `${userdb.map((user, i) => `#${i+1} | **${`<@${user.userID}>` || `sumido#0000`}** (${user.carnaval_pontos_2024})`).join("\n ")}`,
        color: 16776960
      };

      await DiscordRequest(CALLBACK.interaction.response(
        interaction.id, interaction.token
      ), {
        method: "POST",
        body: {
          type: 4,
          data: {
            embeds: [embed]
          }
        }
      });
    }

    if (subCmd === 'ver') {
      let userId;

      if (interaction.data.options[0].options.length === 0) {
        userId = interaction.member.user.id;
      } else {
        userId = interaction.data.options[0].options[0].value;
      }

      let userdb = await db.findOne({
        userID: userId
      });

      if (!userdb) {
        let newUser = new db({
          userID: userId
        });

        await newUser.save();

        userdb = await db.findOne({
          userID: userId
        });
      }

      console.log(userdb);

      await DiscordRequest(CALLBACK.interaction.response(
        interaction.id, interaction.token
      ), {
        method: "POST",
        body: {
          type: 4,
          data: {
            content: `<@${userId}> tem ${userdb.carnaval_pontos_2024} pontos`
          }
        }
      });
    }
  }
};
