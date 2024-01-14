const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const db = require("../../../mongodb/user.js")
const tempo = require("ms")

module.exports = {
  data: {
    name: "minimoedas",
    description: "Comansoa relacionados a Economia",
    type: 1,
    options: [{
      name: "ver",
      description: "Veja suas MiniMoedas",
      type: 1,
      options: [{
        name: "membro",
        description: "Mencione o Membro ou insira o ID",
        type: 6,
        required: false
      }]
    },{
      name: "daily",
      description: "Colete suas MiniMoedas diárias",
      type: 1
    }]
  },
  run: async(interaction) => {

    let subCmd = interaction.data.options[0];

    if (subCmd.name === "ver"){
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

          
        }


        const rankedUsers = await db.find({
              "economia.moedas": { 
                $gt: 0 
              }
            })
                .sort({ 
                  "economia.moedas": -1 
                })
                .exec();
    
            let userPosition = rankedUsers.findIndex(user => user.userID === userdb.userID) + 1;

            if (userdb.economia.moedas === 0) {
           userPosition = rankedUsers.length + 1;
            }


      await DiscordRequest(CALLBACK.interaction.response(
          interaction.id, interaction.token
        ),{
           method: "POST",
           body: {
             type: 4,
             data: {
               content: `<@${userId}> tem ${userdb.economia.moedas} MiniMoedas e está na posição #${userPosition} do rank!`
             }
           }
        })
    }

    if (subCmd.name === "daily"){
      let userdb = await db.findOne({ userID: interaction.member.user.id });

        if (!userdb) {
          let newUser = new db({
            userID: interaction.member.user.id
          });

          await newUser.save();

          userdb = await db.findOne({
            userID: interaction.member.user.id
          });
        }

      let money = getRandomNumberBetween(1000, 10000);

    if(Date.now() < userdb.economia.daily_time){
      const calc = userdb.economia.daily_time - Date.now()

      await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
            content: `Você já coletou suas miniMoedas diárias! Volte em ${ms(calc).hours}horas, ${ms(calc).minutes}minutos e ${ms(calc).seconds} segundos.`,
            flags: 64
          }
        }
      })
    } else {

      userdb.economia.moedas += money;
      userdb.economia.daily_time = Date.now() + tempo("1d");

      await userdb.save();

      await DiscordRequest(CALLBACK.interaction.response(interaction.id, interaction.token),{
        method: "POST",
        body: {
          type: 4,
          data: {
            content: `Hoje você resgatou ${money} mini moedas!`
          }
        }
      })
    }
    }
  }
}


function getRandomNumberBetween(x, y) {
  if (x >= y) {
    throw new Error("O valor de 'x' deve ser menor que 'y'");
  }
  const randomNumber = Math.floor(Math.random() * (y - x + 1)) + x;
  return randomNumber;
}

      function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}