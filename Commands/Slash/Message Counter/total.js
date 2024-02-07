const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js")

module.exports = {
  data: {
    name: "mensagem",
    description: "Comandos relacionados a Mensagens",
    type: 1,
    options: [{
      name: "total",
      description: "Veja quantas mensagens você enviou",
      type: 1,
      options: [{
        name: "membro",
        description: "Mencione um membro",
        type: 6,
        required: false
      }]
    },{
      name: 'rank',
      description: "Veja o rank de mensagens",
      type: 1
    },{
      name: "ganhar",
      description: "Ganhe mensagens 👀",
      type: 1
    }]
  },

  run: async(interaction) => {
    let subCmd = interaction.data.options[0].name;
    
if (subCmd === "ganhar"){

  await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               content: `https://tenor.com/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713`,
               flags: 64
             }
           }
        })
}

    
    if (subCmd === "rank"){
      let userdb = await db.find({})

  userdb.sort((a,b) => (b.msg.de_2024 + b.msg.de_2024) - (a.msg.de_2024 + a.msg.de_2024))

      userdb = userdb.slice(0, 20);

      let embed = {
        title: "Rank de Mensagens",
        description: `${userdb.map((user, i) => `#${i+1} | **${`<@${user.userID}>` || `sumido#0000`}** (${user.msg.de_2024})`).join("\n ")}`,
        color: 16776960
      }

      await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               embeds: [embed]
             }
           }
        })
    }

    
    if (subCmd === 'total'){
      let userId;

        if (interaction.data.options[0].options.length == 0){

        userId = interaction.member.user.id;
        
      } else {
        userId = interaction.data.options[0].options[0].value;
        
        }

        let userdb = await db.findOne({
          userID: userId
        })

        if (!db) {
          let newUser = new db({
            userID: userId
          })

          await newUser.save();

          db = await db.findOne({
          userID: userId
        })
        }


        const rankedUsers = await db.find({
              "msg.de_2024": { 
                $gt: 0 
              }
            })
                .sort({ 
                  "msg.de_2024": -1 
                })
                .exec();
    
            let userPosition = rankedUsers.findIndex(user => user.userID === userdb.userID) + 1;

            if (userdb.msg.de_2024 === 0) {
           userPosition = rankedUsers.length + 1;
            }


      await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               content: `<@${userId}> tem ${userdb.msg.de_2024} mensagens e está na posição #${userPosition} do rank!`
             }
           }
        })
    }



  }
}