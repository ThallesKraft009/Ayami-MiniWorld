const DiscordRequest = require("../settings/request.js");
const CALLBACK = require("../settings/callback.js");
const db = require("../mongodb/user.js");
const FestaJuninaDb = require("../mongodb/eventos.js")

class FestasJuninasEconomy {
  constructor(){
    this.roles = {};
    this.guild = "751534674723078174"
  }

  async pointsUpdates(userId){

    let userdb = await db.find({})

  userdb.sort((a,b) => (b.saojoao_pontosGastos_2024 + b.saojoao_pontosGastos_2024) - (a.saojoao_pontosGastos_2024 + a.saojoao_pontosGastos_2024))

      userdb = userdb.slice(0, 1);

  //  console.log(userdb[0].userID);

    let user = userdb[0].userID;
  //  console.log(userId, user)

    let eventDb = await FestaJuninaDb.findOne();

    if (!eventDb) new FestaJuninaDb({}).save();

    let role = '1246803919972208700';

    let roles = await DiscordRequest(CALLBACK.guild.userGet(this.guild, userId), {
      method: "GET"
    });

    let userRole = await roles.json();

    if (userRole.roles.includes(role)){
      if (user !== userId){

      console.log("Se o autor estiver com o cargo, mas não está no topo.")

        await DiscordRequest(`/guilds/${this.guild}/members/${user}/roles/${role}`,{
          method: "PUT"
        });

        await DiscordRequest(`/guilds/${this.guild}/members/${userId}/roles/${role}`,{
          method: "DELETE"
        })
    } else {
        console.log("Está no topo e está com o cargo.")
    }
  } else if (!userRole.roles.includes(role)){
      console.log(user)
      
      if (user === userId) {
        
 console.log("Se o author não estiver com o cargo, mas está no topo.")
        await DiscordRequest(`/guilds/${this.guild}/members/${eventDb.festasJuninas_2024.topo}/roles/${role}`,{
          method: "DELETE"
        })

        await DiscordRequest(`/guilds/${this.guild}/members/${userId}/roles/${role}`,{
          method: "PUT"
        });
      } else {

        console.log("O Usuário não tem o cargo e não está no topo.")
      }
    }

    eventDb.festasJuninas_2024.topo = `${userId}`;

    await eventDb.save();
  }
}

module.exports = new FestasJuninasEconomy();