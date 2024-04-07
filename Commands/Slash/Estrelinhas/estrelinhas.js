const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js")

module.exports = {
  data: {
    name: 'estrelinhas',
    description: "cmds de estrelinhas",
    type: 1,
    options: [{
      name: "ver",
      description: "Veja quantas estrelinhas você tem",
      type: 1,
      options: [{
        name: "membro",
        description: "Mencione um membro",
        type: 6,
        required: false
      }]
    }]
  },

  run: async(interaction) => {

    let subCmd = interaction.data.options[0].name;
    if (subCmd === 'ver'){

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

          userdb = await db.findOne({
          userID: userId
        })
        }


        const rankedUsers = await db.find({
              "estrelas": { 
                $gt: 0 
              }
            })
                .sort({ 
                  "estrelas": -1 
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
               content: `<@${userId}> tem ${userdb.estrelas} estrelas e está na posição #${userPosition} do rank!`
             }
           }
        })
    }

  }


  }